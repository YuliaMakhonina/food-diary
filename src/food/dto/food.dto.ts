import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { isNumeric } from 'rxjs/internal-compatibility';

export class FoodDto {
  @IsNotEmpty()
  food_name: string;

  @IsNotEmpty()
  @IsNumber()
  calories: number;

  @IsNumber()
  @IsOptional()
  proteins: number;

  @IsNumber()
  @IsOptional()
  fats: number;

  @IsNumber()
  @IsOptional()
  carbs: number;

  @IsNumber()
  @IsOptional()
  fiber: number;

  @IsNumber()
  @IsOptional()
  sugar: number;
}
