import { IsNotEmpty, IsString } from 'class-validator';

export class DiaryFeelingDto {
  @IsNotEmpty()
  @IsString()
  feeling_id: string;

  @IsNotEmpty()
  @IsString()
  date: string;
}
