import { IsNotEmpty, IsString } from 'class-validator';

export class DiaryFeelingDto {
  @IsNotEmpty()
  @IsString()
  feeling_id: string;
}
