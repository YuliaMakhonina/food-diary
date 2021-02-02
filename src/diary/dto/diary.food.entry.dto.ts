import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { FoodEntryDto } from '../../food/dto/food.entry.dto';

@ApiExtraModels()
export class DiaryFoodEntryDto {
  id: string;
  @ApiProperty({ type: 'string' })
  type: 'food';
  date: Date;
  value: FoodEntryDto;
}
