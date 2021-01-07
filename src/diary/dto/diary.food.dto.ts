import { IsNotEmpty, IsString } from 'class-validator';

export class DiaryFoodDto {
  @IsNotEmpty()
  @IsString()
  food_id: string;
}
