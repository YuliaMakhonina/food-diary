import * as faker from 'faker';
import { registerUser } from '../test/test.helpers';

describe('FeelingsController', () => {
  describe('add', () => {
    it('responds with bad data error if feeling name not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('feelings/add', {
          json: {},
        }),
      ).rejects.toThrowError('feeling_name should not be empty');
    });

    it('responds an error if this feeling is already in users list', async () => {
      const authorizedGot = await registerUser();
      const randomName = faker.internet.userName();
      await authorizedGot.post('feelings/add', {
        json: {
          feeling_name: randomName,
        },
      });
      await expect(
        authorizedGot.post('feelings/add', {
          json: {
            feeling_name: randomName,
          },
        }),
      ).rejects.toThrowError('this feeling already exists at user list');
    });

    it('responds feeling uuid if provided data correct', async () => {
      const authorizedGot = await registerUser();
      const res = await authorizedGot
        .post('feelings/add', {
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
