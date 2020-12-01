import { Inject, Injectable } from '@nestjs/common';
import Knex, { QueryBuilder } from 'knex';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private secretKey: string = 'food-diary-secret-number-one';

  constructor(@Inject('knex') private knex: Knex) {}

  async registration(email: string, password: string): Promise<string> {
    let passwordHashed = await bcrypt.hash(password, 1);
    await this.knex('users').insert({
      uuid: uuidv4(),
      email: email,
      password: passwordHashed,
    });
    let userIdQuery = await this.knex
      .select('uuid')
      .from('users')
      .where('email', email);
    let userId = userIdQuery.toString();
    let token = await jwt.sign(
      { iss: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      this.secretKey,
      { algorithm: 'HS512' },
    );
    console.log(token);
    return token;
  }

  async userExists(email: string): Promise<boolean> {
    let userLogin = await this.knex
      .select('uuid')
      .from('users')
      .where('email', email);

    if (userLogin.length > 0) {
      return true;
    }
    return false;
  }

  async authorisation(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    let user = await this.knex
      .first('uuid', 'password')
      .from('users')
      .where('email', email);
    if (!user) {
      return undefined;
    }
    if (bcrypt.compare(password, user.password)) {
      return await jwt.sign(
        {
          iss: user.uuid.toString(),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        this.secretKey,
        { algorithm: 'HS512' },
      );
    }
    return undefined;
  }

  async getUserEmail(userId: string): Promise<string> {
    let user: User = await this.knex
      .first()
      .from('users')
      .where('uuid', userId);
    return user.email;
  }
}
