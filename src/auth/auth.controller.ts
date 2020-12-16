import {
  Controller,
  Post,
  Res,
  Body,
  Req,
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
    if (await this.authService.userExists(data.email.toLowerCase())) {
      throw new BadRequestException('wrong_data', 'this user already exists');
    }
    const accessToken = await this.authService.registration(
      data.email.toLowerCase(),
      data.password,
    );
    res.send({ access_token: accessToken });
  }

  @Post('/auth/login')
  async authorisation(@Body() data: AuthUserDto, @Res() res: Response) {
    const accessToken = await this.authService.authorisation(
      data.email.toLowerCase(),
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
      const userEmail = await this.authService.getUserEmail(req.userId);
      res.send({ email: userEmail });
    } else {
      throw new UnauthorizedException('wrong_token', 'no user ID');
    }
  }
}
