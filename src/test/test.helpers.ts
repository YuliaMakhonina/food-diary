import { testGot } from './got';
import * as faker from 'faker';
import { Got } from 'got';

export async function registerUser(): Promise<Got> {
  const registerResponse = await testGot
    .post('auth/register', {
      json: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    })
    .json<{ access_token: string }>();
  return testGot.extend({
    headers: { access_token: registerResponse.access_token },
  });
}
