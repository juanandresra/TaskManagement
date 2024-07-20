import { Global, Module } from '@nestjs/common';
import { HomeController } from './home.controller';
@Global()
@Module({
    controllers: [HomeController]
})
export class HomeModule { }
