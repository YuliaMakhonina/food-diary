import { IsNotEmpty } from 'class-validator';

export class FoodDto {
  @IsNotEmpty()
  food_name: string;

  @IsNotEmpty()
  calories: number;

  proteins: number;

  fats: number;

  carbs: number;

  fiber: number;

  sugar: number;
}
