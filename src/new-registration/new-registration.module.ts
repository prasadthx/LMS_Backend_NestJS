import { Module } from '@nestjs/common';
import { SuperUserController } from './super-user/super-user.controller';
import { AdminController } from './admin/admin.controller';

@Module({
  controllers: [SuperUserController, AdminController]
})
export class NewRegistrationModule {}
