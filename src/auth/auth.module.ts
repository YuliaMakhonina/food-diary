import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';

@Module({
  imports: [KnexModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
