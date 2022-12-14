import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSuppliersController } from './products-suppliers.controller';
import { ProductsSuppliersService } from './products-suppliers.service';

describe('ProductsSuppliersController', () => {
  let controller: ProductsSuppliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsSuppliersController],
      providers: [ProductsSuppliersService],
    }).compile();

    controller = module.get<ProductsSuppliersController>(ProductsSuppliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
