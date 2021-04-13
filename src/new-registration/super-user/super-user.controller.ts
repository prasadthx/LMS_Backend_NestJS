import {Controller, Get, Render} from '@nestjs/common';

@Controller('super-user')
export class SuperUserController {
    @Get('')
    @Render('index.hbs')
    root() {
        return { message: 'Hello from SuperUser' };
    }
}
