import { Injectable } from '@nestjs/common';
import { CreateDebtsToPayDto } from './dto/create-debts-to-pay.dto';
import { UpdateDebtsToPayDto } from './dto/update-debts-to-pay.dto';

@Injectable()
export class DebtsToPayService {
  create(createDebtsToPayDto: CreateDebtsToPayDto) {
    return 'This action adds a new debtsToPay';
  }

  findAll() {
    return `This action returns all debtsToPay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debtsToPay`;
  }

  update(id: number, updateDebtsToPayDto: UpdateDebtsToPayDto) {
    return `This action updates a #${id} debtsToPay`;
  }

  remove(id: number) {
    return `This action removes a #${id} debtsToPay`;
  }
}
