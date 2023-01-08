import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { Approval } from './entities/approval.entity';

@Injectable()
export class ApprovalsService {

  constructor(
    @InjectRepository(Approval) private readonly approvalRepository: Repository<Approval>,
  ) {}
  create(createApprovalDto: CreateApprovalDto) {

    // const 

    return 'This action adds a new approval';
  }

  findAll() {
    return `This action returns all approvals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} approval`;
  }

  update(id: number, updateApprovalDto: UpdateApprovalDto) {
    return `This action updates a #${id} approval`;
  }

  remove(id: number) {
    return `This action removes a #${id} approval`;
  }
}
