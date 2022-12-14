import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSuppliersService } from './products-suppliers.service';

describe('ProductsSuppliersService', () => {
  let service: ProductsSuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsSuppliersService],
    }).compile();

    service = module.get<ProductsSuppliersService>(ProductsSuppliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
