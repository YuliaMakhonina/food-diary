import { FoodDto } from '../../food/dto/food.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class DiaryFoodEntryDto {
  id: string;
  @ApiProperty({ type: 'string' })
  type: 'food';
  date: Date;
  value: FoodDto;
}
