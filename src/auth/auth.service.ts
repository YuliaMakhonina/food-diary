import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';
import * as bcrypt from 'bcrypt';
import * as config from 'config';
import { TokenService } from '../token/token.service';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject('knex') private knex: Knex,
    private tokenService: TokenService,
  ) {}

  async registration(email: string, password: string): Promise<string> {
    const passwordHashed = await bcrypt.hash(
      password,
      config.get('app.bcryptCircles'),
    );
    await this.knex('users').insert({
      email: email,
      password: passwordHashed,
    });
    const userIdQuery = await this.knex
      .first('uuid')
      .from('users')
      .where('email', email);
    return await this.tokenService.createAccessTokenString(
      userIdQuery.uuid.toString(),
    );
  }

  async userExists(email: string): Promise<boolean> {
    const userLogin = await this.knex
      .select('uuid')
      .from('users')
      .where('email', email);

    return userLogin.length > 0;
  }

  async authorisation(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    const user = await this.knex
      .first('uuid', 'password')
      .from('users')
      .where('email', email);
    if (!user) {
      return undefined;
    }
    console.log(user.uuid);
    if (await bcrypt.compare(password, user.password)) {
      return await this.tokenService.createAccessTokenString(
        user.uuid.toString(),
      );
    }
    return undefined;
  }

  async getUserEmail(userId: string): Promise<string> {
    console.log(userId);
    const user = await this.knex
      .first('email')
      .from('users')
      .where('uuid', userId);
    return user.email;
  }
}
