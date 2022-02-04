import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/users/entities/user.entity';

@Injectable()
export class AppService {
  constructor ( @InjectRepository(User) private readonly userRepository: Repository<User> ){ }

  async signUp(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async signIn(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }
}
