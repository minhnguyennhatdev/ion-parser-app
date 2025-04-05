import { Module } from '@nestjs/common';
import { IonParserService } from './ion-parser.service';
import { IonParserController } from './ion-parser.controller';

@Module({
  controllers: [IonParserController],
  providers: [IonParserService],
})
export class IonParserModule {}
