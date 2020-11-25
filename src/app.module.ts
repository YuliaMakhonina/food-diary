import { Module } from '@nestjs/common';
import { NamesListModule } from './names/names.module';

@Module({
  imports: [NamesListModule],
})
export class AppModule {}
