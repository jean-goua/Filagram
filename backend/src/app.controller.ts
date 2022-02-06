import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('api/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) { }

  @Post('sign-up')
  async signUp(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = this.appService.signUp({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });
    delete (await user).password;
    return user;
  }

  // @Post('sign-up')
  // async signUp(@Body() body: any) {
  //   return this.appService.signUp(body.username, body.email, body.email);
  // }

  @Post('sign-in')
  async signIn(@Body() body: any, @Res({ passthrough: true }) response: Response) {
    console.log('sign-in');
    return this.appService.signIn(body.email, body.password, response);
  }

  @UseGuards() // Check if the user is logged in
  @Get('user')
  async getUser(@Req() request: Request) {
    return this.appService.getOneUser(request);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'successful logout' }
  }
} 
