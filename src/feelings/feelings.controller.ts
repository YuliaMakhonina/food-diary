import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { FeelingsService } from './feelings.service';
import { FeelingsDto } from './dto/feelings.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FeelingsEntryDto } from './dto/feelings.entry.dto';

@ApiTags('feelings')
@Controller('feelings')
export class FeelingsController {
  constructor(private feelingsService: FeelingsService) {}

  @Post()
  async addFeelings(
    @Body()
    data: FeelingsDto,
    @Req() req: Request,
  ): Promise<FeelingsEntryDto> {
    const feelingExists = await this.feelingsService.checkFeelingExisting(
      req.userId,
      data.feeling_name,
    );
    if (feelingExists) {
      throw new BadRequestException(
        `incorrect data`,
        `this feeling already exists at user list`,
      );
    }
    const feelingEntry = await this.feelingsService.addFeeling(
      req.userId,
      data.feeling_name,
    );
    if (feelingEntry) {
      return feelingEntry;
    } else {
      throw new BadRequestException('wrong_data', 'wrong data');
    }
  }

  @Get()
  @ApiCreatedResponse({ type: FeelingsEntryDto })
  async getAllFeelings(@Req() req: Request): Promise<FeelingsEntryDto[]> {
    const feelingsEntries = await this.feelingsService.getAllFeelings(
      req.userId,
    );
    return feelingsEntries;
  }
}
