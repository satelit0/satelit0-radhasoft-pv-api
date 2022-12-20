import { PartialType } from '@nestjs/swagger';
import { CreateCompanyBaseDto } from './create-company-base.dto';

export class UpdateCompanyBaseDto extends PartialType(CreateCompanyBaseDto) {}
