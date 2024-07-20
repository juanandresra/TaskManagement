import { Module } from '@nestjs/common';
import { HomeModule } from './modules/home/home.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HomeModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ]
})
export class AppModule { }
