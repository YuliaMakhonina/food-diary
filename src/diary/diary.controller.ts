import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryFoodDto } from './dto/diary.food.dto';
import { Request } from 'express';
import { DiaryFeelingDto } from './dto/diary.feeling.dto';
import { DiaryFeelingEntryDto } from './dto/diary.feeling.entry.dto';
import { DiaryFoodEntryDto } from './dto/diary.food.entry.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DiaryDto } from './dto/diary.dto';
import { DiaryQueryDto } from './dto/diary.query.dto';

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
    return await this.diaryService.addFoodToDiary(
      data.food_id,
      data.date,
      req.userId,
    );
  }

  @Post('feelings')
  @ApiCreatedResponse({ type: DiaryFeelingEntryDto })
  async addFeelingToDiary(
    @Body() data: DiaryFeelingDto,
    @Req() req: Request,
  ): Promise<DiaryFeelingEntryDto> {
    return await this.diaryService.addFeelingToDiary(
      data.feeling_id,
      data.date,
      req.userId,
    );
  }

  @Get()
  @ApiCreatedResponse({ type: DiaryDto })
  async getDiaryList(
    @Query() query: DiaryQueryDto,
    @Req() req: Request,
  ): Promise<DiaryDto[]> {
    return this.diaryService.getDiary(
      req.userId,
      query.date_min,
      query.date_max,
      query.timezone,
    );
  }
}
