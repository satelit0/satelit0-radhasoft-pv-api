import { Test, TestingModule } from '@nestjs/testing';
import { DescriptionProductController } from './description-product.controller';
import { DescriptionProductService } from './description-product.service';

describe('DescriptionProductController', () => {
  let controller: DescriptionProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptionProductController],
      providers: [DescriptionProductService],
    }).compile();

    controller = module.get<DescriptionProductController>(DescriptionProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
