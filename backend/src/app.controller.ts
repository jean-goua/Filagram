import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
    ) {}


    // TOUT METTRE AU PROPRE
    // Utiliser @UseGuard avant les post et get pour ne pas avoir à utiliser les conditions sur les tokens


  @Post('sign-up')
  async signUp(@Body() body: any) {
    console.log('sign-up');
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = this.appService.signUp({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    delete (await user).password;
    return user;
  }

  @Post('sign-in')
  async signIn(@Body() body: any, @Res({ passthrough: true }) response: Response) {
    console.log('sign-in');
    const user = await this.appService.signIn({ email: body.email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!await bcrypt.compare(body.password, user.password)){
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return { message: 'success' };
  }

  @Get('user')
  async getUser(@Req() request: Request){
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
  
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.appService.signIn({ id: data['id'] });

      const {password, ...result} = user;

      return result;
    } catch (e){
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success'
    }
  }
}
