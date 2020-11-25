import { NamesListService } from './names.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class NamesListController {
  constructor(private namesListService: NamesListService) {}

  @Get('names')
  async getNames() {
    let names = await this.namesListService.getNamesList();
    return { names: names };
  }
}
