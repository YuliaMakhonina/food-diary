import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryFoodDto } from './dto/diary.food.dto';
import { Request } from 'express';
import { DiaryFeelingDto } from './dto/diary.feeling.dto';

@Controller()
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Post('diary/food/add')
  async addFoodToDiary(@Body() data: DiaryFoodDto, @Req() req: Request) {
    const diaryFoodEntry = await this.diaryService.addFoodToDiary(
      data.food_id,
      req.userId,
    );
    return { food_entry: diaryFoodEntry };
  }

  @Post('diary/feelings/add')
  async addFeelingToDiary(@Body() data: DiaryFeelingDto, @Req() req: Request) {
    const diaryFeelingEntry = await this.diaryService.addFeelingToDiary(
      data.feeling_id,
      req.userId,
    );
    return { feeling_entry: diaryFeelingEntry };
  }

  @Get('diary/list')
  async getDiaryList(@Req() req: Request) {
    const diary = await this.diaryService.getDiary(req.userId);
    return { diary_list: diary };
  }
}
