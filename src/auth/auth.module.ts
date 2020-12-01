import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [KnexModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
