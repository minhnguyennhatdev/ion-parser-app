import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IonParserService } from './ion-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ion-parser')
export class IonParserController {
  constructor(private readonly ionParserService: IonParserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async parseIonFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const buffer = Buffer.from(file.buffer);
      const parsedData = this.ionParserService.parseIonFile(buffer);
      return { success: true, data: parsedData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
