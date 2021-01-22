import { DiaryFeelingEntryDto } from './diary.feeling.entry.dto';
import { DiaryFoodEntryDto } from './diary.food.entry.dto';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class DiaryDto {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(DiaryFoodEntryDto) },
        { $ref: getSchemaPath(DiaryFeelingEntryDto) },
      ],
    },
  })
  entries: (DiaryFeelingEntryDto | DiaryFoodEntryDto)[];
}
