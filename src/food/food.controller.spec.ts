import { testGot } from '../test/got';

import * as faker from 'faker';
import { registerUser } from '../test/test.helpers';

describe('FoodController', () => {
  describe('add', () => {
    it('responds with bad data error if food name not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('food_name should not be empty');
    });

    it('responds with bad data error if calories not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: faker.internet.userName(),
          },
        }),
      ).rejects.toThrowError('calories should not be empty');
    });

    it('responds with bad request error if proteins is not a number', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: faker.internet.userName(),
            proteins: 'randomName',
          },
        }),
      ).rejects.toThrowError(
        'proteins must be a number conforming to the specified constraints',
      );
    });

    it('responds with bad request error if fats is not a number', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: faker.internet.userName(),
            fats: 'randomName',
          },
        }),
      ).rejects.toThrowError(
        'fats must be a number conforming to the specified constraints',
      );
    });

    it('responds with bad request error if fiber is not a number', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: faker.internet.userName(),
            fiber: 'randomName',
          },
        }),
      ).rejects.toThrowError(
        'fiber must be a number conforming to the specified constraints',
      );
    });

    it('responds with bad request error if carbs is not a number', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: faker.internet.userName(),
            carbs: 'randomName',
          },
        }),
      ).rejects.toThrowError(
        'carbs must be a number conforming to the specified constraints',
      );
    });

    it('responds with bad request error if sugar is not a number', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: faker.internet.userName(),
            sugar: 'randomName',
          },
        }),
      ).rejects.toThrowError(
        'sugar must be a number conforming to the specified constraints',
      );
    });

    it('responds an error if this food is already in users list', async () => {
      const authorizedGot = await registerUser();
      const randomName = faker.internet.userName();
      await authorizedGot.post('food/add', {
        json: {
          food_name: randomName,
          calories: 45.0,
        },
      });
      await expect(
        authorizedGot.post('food/add', {
          json: {
            food_name: randomName,
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('this food already exists at user list');
    });

    it('responds food uuid if provided data correct', async () => {
      const authorizedGot = await registerUser();
      const res = await authorizedGot
        .post('food/add', {
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
