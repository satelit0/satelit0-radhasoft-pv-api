import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { UpdateApprovalDto } from './dto/update-approval.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { isUUID, IsUUID, IS_UUID } from 'class-validator';
import { StatusApproval } from 'src/helpers/enums';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';

@Controller('approvals')
@ApiTags('Approvation')
export class ApprovalsController {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createApprovalDto: CreateApprovalDto, @Req() request: IRequestWithUser) {
    const { subsidiaryId, id: userRequesId } = request.user;
    createApprovalDto.userRequestId = userRequesId;
    createApprovalDto.userAuthorizeId = userRequesId;
    createApprovalDto.subsidiaryId = subsidiaryId;
    return await this.approvalsService.create({createApprovalDto});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.approvalsService.findAll(StatusApproval.PENDING); 
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.approvalsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async  update(@Param('id') id: string, @Body() updateApprovalDto: UpdateApprovalDto) {
    return await this.approvalsService.update(id, updateApprovalDto);
  }

  @ApiQuery({name: 'soft', required: false})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Query('soft') soft?: boolean) {
    return await this.approvalsService.remove(id, soft);
  }
}
