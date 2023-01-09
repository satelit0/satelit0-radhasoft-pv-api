import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid/async';
import { DataSource, QueryResult, QueryRunner, Repository } from 'typeorm';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { Approval } from './entities/approval.entity';
import { StatusApproval } from '../../../helpers/enums';

@Injectable()
export class ApprovalsService {

  constructor(
    @InjectRepository(Approval) private readonly approvalRepository: Repository<Approval>,
    @Inject('DataSource') private readonly dataSource: DataSource

  ) { }
  async create(paramas: { createApprovalDto: CreateApprovalDto }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { createApprovalDto, } = paramas;
      const newAproval = await this.saveApproval({ queryRunner, createApprovalDto });
      await queryRunner.commitTransaction();
      return newAproval;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`${error.message}`, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async saveApproval(params: { createApprovalDto: CreateApprovalDto, queryRunner: QueryRunner }) {
    try {
      const { createApprovalDto, queryRunner } = params;
      // const authorizationCode = await nanoid();
      const approval = this.approvalRepository.create({ ...createApprovalDto });
      const newApproval = await queryRunner.manager.save(Approval, approval);
      return newApproval;
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  findAll(statusRequest: StatusApproval) {
    try {
      return this.approvalRepository.findAndCount({
        where: { statusRequest },
        relations: {
          userRequest: true,
          userAuthorize: true,
        }
      });
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  findOne(id: string) {
    try {
      const approval = this.approvalRepository.findOne({
        where: { id },
        relations: {
          userRequest: true,
        }
      });
      return approval;
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  update(id: string, updateApprovalDto: UpdateApprovalDto) {
    try {
      return this.approvalRepository.update(id, { ...updateApprovalDto });
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  restore(id: string) {
    try {
      return this.approvalRepository.restore(id);
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  remove(id: string, soft: boolean = true) {
    try {
      if (soft) return this.approvalRepository.softDelete(id);
      return this.approvalRepository.delete(id);
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }
  }
}
