import { testGot } from '../test/got';

import * as faker from 'faker';

describe('AuthController', () => {
  describe('register', () => {
    it('responds with bad data error if password not provided', async () => {
      await expect(
        testGot.post('auth/register', {
          json: {
            email: faker.internet.email(),
          },
        }),
      ).rejects.toThrowError('password should not be empty');
    });

    it('responds with bad data error if email not provided', async () => {
      await expect(
        testGot.post('auth/register', {
          json: {
            password: faker.internet.password(),
          },
        }),
      ).rejects.toThrowError('email must be an email');
    });

    it('responds with error if email is invalid', async () => {
      await expect(
        testGot.post('auth/register', {
          json: {
            email: faker.internet.userName(),
            password: faker.internet.password(),
          },
        }),
      ).rejects.toThrowError('email must be an email');
    });

    it('responds with access_token if provided data correct', async () => {
      const res = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json();

      expect(res).toEqual({
        access_token: expect.any(String),
      });
    });

    it('responds error if user already exists', async () => {
      const email = faker.internet.email();
      await testGot.post('auth/register', {
        json: {
          email: email,
          password: faker.internet.password(),
        },
      });
      await expect(
        testGot.post('auth/register', {
          json: {
            email: email,
            password: faker.internet.password(),
          },
        }),
      ).rejects.toThrowError('user already exists');
    });
  });
});
