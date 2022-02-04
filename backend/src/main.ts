import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });

  await app.listen(3000);
}
bootstrap();

/*const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



// Generate JWT for a user
const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = {
  id: 10,
  name: 'Jean Goua',
  email: 'jean-goua@hotmail.fr'
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

app.post('api/login', (req, res) => { 
  if (req.body.email !== user.email) { 
    res.status(401).send('Invalid credentials');
    return;
  }
  if (req.body.password !== 'azezrty') { 
    res.status(401).send('Invalid credentials');
    return;
  }

  const accessToken = generateAccessToken(user);
  res.send({
    accessToken,
  });
 });*/

 
 
