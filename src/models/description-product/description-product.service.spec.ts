import { Test, TestingModule } from '@nestjs/testing';
import { DescriptionProductService } from './description-product.service';

describe('DescriptionProductService', () => {
  let service: DescriptionProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptionProductService],
    }).compile();

    service = module.get<DescriptionProductService>(DescriptionProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
