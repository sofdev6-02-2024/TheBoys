import { Module } from '@nestjs/common';
import { DataWrapperController } from './data-wrapper.controller';
import { DataWrapperService } from './data-wrapper.service';

@Module({
  controllers: [DataWrapperController],
  providers: [DataWrapperService],
})
export class DataWrapperModule {}
