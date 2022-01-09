import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './echo/chat.module';

@Module({
  imports: [
    ChatModule
  ]
})
export class AppModule {}
