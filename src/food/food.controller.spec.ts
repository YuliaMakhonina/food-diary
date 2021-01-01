import { testGot } from '../test/got';

import * as faker from 'faker';

describe('FoodController', () => {
  describe('add', () => {
    it('responds with bad data error if food name not provided', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();
      await expect(
        testGot.post('food/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('food_name should not be empty');
    });

    it('responds with bad data error if calories not provided', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();
      await expect(
        testGot.post('food/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            food_name: faker.internet.userName(),
          },
        }),
      ).rejects.toThrowError('calories should not be empty');
    });

    it('responds an error if this food is already in users list', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();

      const randomName = faker.internet.userName();
      await testGot.post('food/add', {
        headers: {
          access_token: registerResponse.access_token,
        },
        json: {
          food_name: randomName,
          calories: 45.0,
        },
      });
      await expect(
        testGot.post('food/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            food_name: randomName,
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('this food already exists at user list');
    });

    it('responds food uuid if provided data correct', async () => {
      const registerResponse = await testGot
        .post('auth/register', {
          json: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        })
        .json<{ access_token: string }>();

      const res = await testGot
        .post('food/add', {
          headers: {
            access_token: registerResponse.access_token,
          },
          json: {
            food_name: faker.internet.password(),
            calories: 45.0,
          },
        })
        .json();

      expect(res).toEqual({
        food_id: expect.any(String),
      });
    });
  });
});
