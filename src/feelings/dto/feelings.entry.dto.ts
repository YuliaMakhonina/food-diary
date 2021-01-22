import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FeelingsEntryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  system: boolean;
}
