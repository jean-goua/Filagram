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

  /*getJWT(req: any, res: any) {
    console.log('0');
    const express = require('express');
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    console.log('1');
    // Generate JWT for a user
    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    console.log('2');
    const user = {
      id: 10,
      name: 'Jean Goua',
      email: 'jean-goua@hotmail.fr'
    }

    function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
    }
    console.log('3');
      if (req.body.email !== user.email) { 
        res.status(401).send('Invalid credentials');
        return;
      }
      if (req.body.password !== 'azezrty') { 
        res.status(401).send('Invalid credentials');
        return;
      }
      console.log('4');
      const accessToken = generateAccessToken(user);
      res.send({
        accessToken,
      });
    console.log('5');
  }*/
}
