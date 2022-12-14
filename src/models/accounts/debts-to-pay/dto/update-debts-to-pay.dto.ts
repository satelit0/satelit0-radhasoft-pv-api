import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtsToPayDto } from './create-debts-to-pay.dto';

export class UpdateDebtsToPayDto extends PartialType(CreateDebtsToPayDto) {}
