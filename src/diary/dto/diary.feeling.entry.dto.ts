import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { FeelingsEntryDto } from '../../feelings/dto/feelings.entry.dto';

@ApiExtraModels()
export class DiaryFeelingEntryDto {
  id: string;
  @ApiProperty({ type: 'string' })
  type: 'feeling';
  date: Date;
  value: FeelingsEntryDto;
}
