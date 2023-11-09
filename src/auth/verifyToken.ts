import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, NextFunction } from 'express';
import { jwtConstants } from './constants/constants';

export async function verifyToken(req: Request, _, next: NextFunction) {
  const jwtService = new JwtService();
  const bearerHeader = req.headers.authorization as string;
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
      return next(
        new UnauthorizedException({
          message: 'Invalid bearer token',
          error: 'Unauthorized',
          statusCode: 401,
        }),
      );
    }
    next();
    return;
  }

  throw new UnauthorizedException({
    message: 'Invalid bearer token',
    error: 'Unauthorized',
    statusCode: 401,
  });
}
