import { testGot } from '../test/got';

import * as faker from 'faker';

describe('FeelingsController', () => {
  describe('add', () => {
    it('responds with bad data error if feeling name not provided', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();
      await expect(
        testGot.post('feelings/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('feeling_name should not be empty');
    });

    it('responds an error if this feeling is already in users list', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();

      const randomName = faker.internet.userName();
      await testGot.post('feelings/add', {
        headers: {
          access_token: registerResponse.access_token,
        },
        json: {
          feeling_name: randomName,
        },
      });
      await expect(
        testGot.post('feelings/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            feeling_name: randomName,
          },
        }),
      ).rejects.toThrowError('this feeling already exists at user list');
    });

    it('responds feeling uuid if provided data correct', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();

      const res = await testGot
        .post('feelings/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            feeling_name: faker.internet.userName(),
          },
        })
        .json();

      expect(res).toEqual({
        feeling_id: expect.any(String),
      });
    });
  });
});
