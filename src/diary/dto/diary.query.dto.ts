import { IsOptional, IsString } from 'class-validator';

export class DiaryQueryDto {
  @IsString()
  @IsOptional()
  date_min: string;

  @IsString()
  @IsOptional()
  date_max: string;

  @IsString()
  timezone: string;
}
