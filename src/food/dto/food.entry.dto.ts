import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FoodEntryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  calories: number;

  @IsNumber()
  @IsNotEmpty()
  proteins: number;

  @IsNumber()
  @IsNotEmpty()
  fats: number;

  @IsNumber()
  @IsNotEmpty()
  carbs: number;

  @IsNumber()
  @IsNotEmpty()
  sugar: number;

  @IsNumber()
  @IsNotEmpty()
  fiber: number;

  @IsBoolean()
  @IsNotEmpty()
  system: boolean;
}
