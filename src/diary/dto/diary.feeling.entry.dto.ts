import { FeelingsDto } from '../../feelings/dto/feelings.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class DiaryFeelingEntryDto {
  id: string;
  @ApiProperty({ type: 'string' })
  type: 'feeling';
  date: Date;
  value: FeelingsDto;
}
