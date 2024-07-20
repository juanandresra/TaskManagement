import { Controller, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('home')
export class HomeController {

    @Get('/')
    async get(@Res() res: Response) {
        res.status(200).send('Home');
    };

};
