import { IsNotEmpty } from 'class-validator';

export class FeelingsDto {
  @IsNotEmpty()
  feeling_name: string;
}
