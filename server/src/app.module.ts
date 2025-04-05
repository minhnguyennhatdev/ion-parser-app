import { Module } from '@nestjs/common';
import { IonParserModule } from './modules/ion-parser/ion-parser.module';

@Module({
  imports: [IonParserModule],
})
export class AppModule {}
