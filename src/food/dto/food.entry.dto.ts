import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FoodEntryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  calories: number;

  @IsString()
  @IsNotEmpty()
  proteins: number;

  @IsString()
  @IsNotEmpty()
  fats: number;

  @IsString()
  @IsNotEmpty()
  carbs: number;

  @IsString()
  @IsNotEmpty()
  sugar: number;

  @IsString()
  @IsNotEmpty()
  fiber: number;

  @IsBoolean()
  @IsNotEmpty()
  system: boolean;
}
