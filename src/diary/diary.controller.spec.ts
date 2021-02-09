import { registerUser } from '../test/test.helpers';
import { FeelingsEntryDto } from '../feelings/dto/feelings.entry.dto';
import { FoodEntryDto } from '../food/dto/food.entry.dto';
import { DiaryFeelingEntryDto } from './dto/diary.feeling.entry.dto';

describe('DiaryController', () => {
  describe('diary/food', () => {
    it('responds with bad data error if food_id is not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('diary/food', {
          json: {
            date: '2021-01-01 00:51:40',
          },
        }),
      ).rejects.toThrowError('food_id should not be empty');
    });
    it('responds with bad data error if date not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('diary/food', {
          json: {
            food_id: '4ffab3b4-f8b3-49f2-93e3-c098a12856a7',
          },
        }),
      ).rejects.toThrowError('date should not be empty');
    });
    it('responds DiaryFoodEntryDto if provided data is correct', async () => {
      const authorizedGot = await registerUser();
      const foodList: FoodEntryDto[] = await authorizedGot.get('food').json();
      const result = await authorizedGot
        .post('diary/food', {
          json: {
            food_id: foodList[0].id,
            date: '2021-01-01 00:51:45',
          },
        })
        .json();
      expect(result).toEqual({
        id: expect.any(String),
        type: 'food',
        date: expect.any(String),
        value: expect.objectContaining({
          id: foodList[0].id,
        }),
      });
    });
  });
  describe('diary/feelings', () => {
    it('responds with bad data error if feeling_id is not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('diary/feelings', {
          json: {
            date: '2021-01-01 00:51:40',
          },
        }),
      ).rejects.toThrowError('feeling_id should not be empty');
    });
    it('responds with bad data error if date not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(
        authorizedGot.post('diary/feelings', {
          json: {
            feeling_id: '13232adf-a80f-4a32-ab0e-146c8ceffba5',
          },
        }),
      ).rejects.toThrowError('date should not be empty');
    });
    it('responds DiaryFeelingEntryDto if provided data is correct', async () => {
      const authorizedGot = await registerUser();
      const feelingsList: FeelingsEntryDto[] = await authorizedGot
        .get('feelings')
        .json();
      const result = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-01 00:51:40',
          },
        })
        .json();
      expect(result).toEqual({
        id: expect.any(String),
        type: 'feeling',
        date: expect.any(String),
        value: {
          id: feelingsList[0].id,
          name: expect.any(String),
          system: expect.any(Boolean),
        },
      });
    });
  });
  describe('diary', () => {
    it('responds with bad request error if timezone is not provided', async () => {
      const authorizedGot = await registerUser();
      await expect(authorizedGot.get('diary')).rejects.toThrowError(
        'timezone must be a string',
      );
    });
    it('responds diary if data is correct', async () => {
      const authorizedGot = await registerUser();
      const feelingsList: FeelingsEntryDto[] = await authorizedGot
        .get('feelings')
        .json();
      const diaryEntry: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-01',
          },
        })
        .json();
      const res = await authorizedGot
        .get('diary', { searchParams: { timezone: 'Europe/Moscow' } })
        .json();
      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: diaryEntry.id }),
        ]),
      );
    });

    it('responds diary from date_min to date_max with current timezone', async () => {
      const authorizedGot = await registerUser();
      const feelingsList: FeelingsEntryDto[] = await authorizedGot
        .get('feelings')
        .json();
      const diaryEntry1: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-01 00:51:40',
          },
        })
        .json();
      const diaryEntry2: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-02 00:51:40',
          },
        })
        .json();
      const diaryEntry3: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-03 00:51:40',
          },
        })
        .json();
      const diaryEntry4: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-04 00:51:40',
          },
        })
        .json();
      const res = await authorizedGot
        .get('diary', {
          searchParams: {
            timezone: 'Europe/Moscow',
            date_min: '2021-01-02',
            date_max: '2021-01-03',
          },
        })
        .json();
      expect(res).toEqual([
        expect.objectContaining({ id: diaryEntry3.id }),
        expect.objectContaining({ id: diaryEntry2.id }),
      ]);
    });
    it('responds diary from date_min with current timezone', async () => {
      const authorizedGot = await registerUser();
      const feelingsList: FeelingsEntryDto[] = await authorizedGot
        .get('feelings')
        .json();
      const diaryEntry1: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-01 00:51:40',
          },
        })
        .json();
      const diaryEntry2: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-02 00:51:40',
          },
        })
        .json();
      const res = await authorizedGot
        .get('diary', {
          searchParams: {
            timezone: 'Europe/Moscow',
            date_min: '2021-01-02',
          },
        })
        .json();
      expect(res).toEqual([expect.objectContaining({ id: diaryEntry2.id })]);
    });
    it('responds diary to date_max with current timezone', async () => {
      const authorizedGot = await registerUser();
      const feelingsList: FeelingsEntryDto[] = await authorizedGot
        .get('feelings')
        .json();
      const diaryEntry1: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-02 00:51:40',
          },
        })
        .json();
      const diaryEntry2: DiaryFeelingEntryDto = await authorizedGot
        .post('diary/feelings', {
          json: {
            feeling_id: feelingsList[0].id,
            date: '2021-01-03 00:51:40',
          },
        })
        .json();
      const res = await authorizedGot
        .get('diary', {
          searchParams: {
            timezone: 'Europe/Moscow',
            date_max: '2021-01-02',
          },
        })
        .json();
      expect(res).toEqual([expect.objectContaining({ id: diaryEntry1.id })]);
    });
  });
});
