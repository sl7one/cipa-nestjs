/* eslint-disable prettier/prettier */
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants/constants';

export async function verifyToken(req: Request) {
  const jwtService = new JwtService();
  const bearerHeader = req.headers['Authorization'] as string;
  if (typeof bearerHeader !== 'undefined') {
    const [bearer, token] = bearerHeader.split(' ');
    if (bearer !== 'Bearer') {
      throw new UnauthorizedException({
        message: 'Invalid headers',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    try {
      await jwtService.verifyAsync(token, jwtConstants);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Invalid bearer token',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }
  }
  throw new UnauthorizedException({
    message: 'Invalid bearer token',
    error: 'Unauthorized',
    statusCode: 401,
  });
}
