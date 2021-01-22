import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryFoodDto } from './dto/diary.food.dto';
import { Request } from 'express';
import { DiaryFeelingDto } from './dto/diary.feeling.dto';
import { DiaryFeelingEntryDto } from './dto/diary.feeling.entry.dto';
import { DiaryFoodEntryDto } from './dto/diary.food.entry.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DiaryDto } from './dto/diary.dto';

@ApiTags('diary')
@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Post('food')
  @ApiCreatedResponse({ type: DiaryFoodEntryDto })
  async addFoodToDiary(
    @Body() data: DiaryFoodDto,
    @Req() req: Request,
  ): Promise<DiaryFoodEntryDto> {
    const diaryFoodEntry = await this.diaryService.addFoodToDiary(
      data.food_id,
      data.date,
      req.userId,
    );
    return diaryFoodEntry;
  }

  @Post('feelings')
  @ApiCreatedResponse({ type: DiaryFeelingEntryDto })
  async addFeelingToDiary(
    @Body() data: DiaryFeelingDto,
    @Req() req: Request,
  ): Promise<DiaryFeelingEntryDto> {
    const diaryFeelingEntry: DiaryFeelingEntryDto = await this.diaryService.addFeelingToDiary(
      data.feeling_id,
      data.date,
      req.userId,
    );
    return diaryFeelingEntry;
  }

  @Get()
  async getDiaryList(@Req() req: Request): Promise<DiaryDto> {
    const diary: (
      | DiaryFoodEntryDto
      | DiaryFeelingEntryDto
    )[] = await this.diaryService.getDiary(req.userId);
    return { entries: diary };
  }
}
