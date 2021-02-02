import * as faker from 'faker';
import { registerUser } from '../test/test.helpers';

describe('FeelingsController', () => {
  describe('feelings', () => {
    it('responds with bad data error if feeling name not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('feelings', {
          json: {},
        }),
      ).rejects.toThrowError('feeling_name should not be empty');
    });

    it('responds an error if this feeling is already in users list', async () => {
      const authorizedGot = await registerUser();
      const randomName = faker.internet.userName();
      await authorizedGot.post('feelings', {
        json: {
          feeling_name: randomName,
        },
      });
      await expect(
        authorizedGot.post('feelings', {
          json: {
            feeling_name: randomName,
          },
        }),
      ).rejects.toThrowError('this feeling already exists at user list');
    });

    it('responds feeling dto if provided data correct', async () => {
      const authorizedGot = await registerUser();
      const fakeName = faker.internet.userName();
      const res = await authorizedGot
        .post('feelings', {
          json: {
            feeling_name: fakeName,
          },
        })
        .json();

      expect(res).toEqual({
        id: expect.any(String),
        name: fakeName,
        system: false,
      });
    });

    it('responds feeling-list dto if provided data correct', async () => {
      const authorizedGot = await registerUser();
      const res = await authorizedGot.get('feelings').json();

      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Боль в желудке',
            system: true,
          }),
        ]),
      );
    });
  });
});
