import { Controller, Get, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('api/users/')
export class UsersController {
  constructor(
  private readonly usersService: UsersService,
  private jwtService: JwtService
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = this.usersService.signUp({
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
    return await this.usersService.signIn(body.email, body.password, response) ? {success: true} : {success: false};
  }

  @UseGuards() // Check if the user is logged in
  @Get('getCurrentUser')
  async getUser(@Req() request: Request) {
    return this.usersService.getOneUser(request);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'successful logout' }
  }
}
