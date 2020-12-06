import { testGot } from '../test/got';

import * as faker from 'faker';

describe("AuthController", () => {
  describe("register", () => {
    it('responds with bad data error if password not provided', async () => {
      await expect(
        testGot.post('auth/register', {
          json: {
            email: faker.internet.email(),
          }
        })
      ).rejects.toThrowError('(400) password should not be empty')
    });

    it('responds with bad data error if email not provided', async () => {
      await expect(
        testGot.post('auth/register', {
          json: {
            password: faker.internet.password(),
          }
        })
      ).rejects.toThrowError('(400) email must be an email')
    });

    it('responds with access_token if provided data correct', async () => {
      const res = await testGot.post('auth/register', {
        json: {
          email: faker.internet.email(),
          password: faker.internet.password(),
        }
      }).json();

      expect(res).toEqual({
        access_token: expect.any(String)
      });
    });
  });
});
