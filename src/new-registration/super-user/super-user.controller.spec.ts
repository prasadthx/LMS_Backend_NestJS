import { Test, TestingModule } from '@nestjs/testing';
import { SuperUserController } from './super-user.controller';

describe('SuperUserController', () => {
  let controller: SuperUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperUserController],
    }).compile();

    controller = module.get<SuperUserController>(SuperUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
