import * as faker from 'faker';
import { registerUser } from '../test/test.helpers';
import { FoodEntryDto } from './dto/food.entry.dto';

describe('FoodController', () => {
  describe('food', () => {
    it('responds with bad data error if food name not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food', {
          json: {
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('food_name should not be empty');
    });

    it('responds with bad data error if calories not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food', {
          json: {
            food_name: faker.internet.userName(),
          },
        }),
      ).rejects.toThrowError('calories should not be empty');
    });

    it('responds with bad request error if proteins is not a number', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('food', {
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
        authorizedGot.post('food', {
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
        authorizedGot.post('food', {
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
        authorizedGot.post('food', {
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
        authorizedGot.post('food', {
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
      await authorizedGot.post('food', {
        json: {
          food_name: randomName,
          calories: 45.0,
        },
      });
      await expect(
        authorizedGot.post('food', {
          json: {
            food_name: randomName,
            calories: 45.0,
          },
        }),
      ).rejects.toThrowError('this food already exists at user list');
    });

    it('responds food dto if provided data correct', async () => {
      const authorizedGot = await registerUser();
      const res = await authorizedGot
        .post('food', {
          json: {
            food_name: faker.internet.password(),
            calories: 45.0,
          },
        })
        .json();

      expect(res).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        proteins: expect.any(Number),
        fats: expect.any(Number),
        carbs: expect.any(Number),
        fiber: expect.any(Number),
        sugar: expect.any(Number),
        calories: expect.any(Number),
        system: false,
      });
    });

    it('responds food-list dto if provided data correct', async () => {
      const authorizedGot = await registerUser();
      const res = await authorizedGot.get('food').json();
      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            calories: 171,
            carbs: 1.15,
            fats: 11.88,
            fiber: 0,
            name: 'Яйцо индейки (сырое)',
            proteins: 13.68,
            sugar: 0,
            system: true,
          }),
        ]),
      );
    });
  });
});
