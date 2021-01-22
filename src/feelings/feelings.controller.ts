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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('feelings')
@Controller('feelings')
export class FeelingsController {
  constructor(private feelingsService: FeelingsService) {}

  @Post()
  async addFeelings(
    @Body()
    data: FeelingsDto,
    @Req() req: Request,
  ) {
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
    const feelingUuid = await this.feelingsService.addFeeling(
      req.userId,
      data.feeling_name,
    );
    if (feelingUuid) {
      return { feeling_id: feelingUuid };
    } else {
      throw new BadRequestException('wrong_data', 'wrong data');
    }
  }

  @Get()
  async getAllFeelings(@Req() req: Request) {
    const feelingsList = await this.feelingsService.getAllFeelings(req.userId);
    return { feelings_list: feelingsList };
  }
}
