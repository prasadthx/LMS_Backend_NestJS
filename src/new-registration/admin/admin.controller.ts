import {Controller, Get, Render} from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get('')
    @Render('index.hbs')
    root() {
        return { message: 'Hello from Admin' };
    }
}
