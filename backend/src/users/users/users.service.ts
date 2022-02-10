import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { resolve } from 'path/posix';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async signUp(data: any): Promise<User> {
    console.log(data);
    return this.userRepository.save(data);
  }

  /*async signUp(username: any, email: any, password: any): Promise<User> {
    // console.log('sign-up');
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('hashedPassword :', hashedPassword);
    const user = this.userRepository.save({
      username: username,
      email: email,
      password: hashedPassword,
    });
    console.log('user :', user);
    delete (await user).password;
    return user;
  }*/

  async getOneUser(request: any): Promise<User> {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const user = await this.userRepository.findOne({ id: data['id'] });
    delete user.password;
    return user;
  }

  async signIn(email: string, password: string, response: any): Promise<any> {
    return new Promise<any>(async (resolve) => {
      try {
        const user = await this.userRepository.findOne({ email: email });

        // Check if the user exist and if it's a wrong password
        if (!user || !await bcrypt.compare(password, user.password)) resolve(false);

        console.log(user);
        const jwt = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, { httpOnly: true });

        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
  }
}
