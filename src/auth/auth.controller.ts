import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Req,
  BadGatewayException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthUserDto } from './dto/auth.user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  async registration(@Body() data: CreateUserDto, @Res() res: Response) {
    if (await this.authService.userExists(data.email)) {
      throw new BadRequestException('wrong_data', 'this user already exists');
    }
    let accessToken = await this.authService.registration(
      data.email,
      data.password,
    );
    res.send({ access_token: accessToken });
  }

  // TODO Extract separate class
  @Post('/auth/login')
  async authorisation(@Body() data: AuthUserDto, @Res() res: Response) {
    let accessToken = await this.authService.authorisation(
      data.email,
      data.password,
    );
    if (accessToken) {
      res.send({ access_token: accessToken });
    } else {
      throw new BadRequestException('wrong_data', 'wrong login or password');
    }
  }

  @Post('/auth/me')
  async authMe(@Req() req: Request, @Res() res: Response) {
    if (req.userId) {
      let userEmail = await this.authService.getUserEmail(req.userId);
      res.send({ email: userEmail });
    } else {
      throw new UnauthorizedException();
    }
  }
}