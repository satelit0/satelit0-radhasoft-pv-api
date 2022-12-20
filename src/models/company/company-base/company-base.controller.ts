import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyBaseService } from './company-base.service';
import { CreateCompanyBaseDto } from './dto/create-company-base.dto';
import { UpdateCompanyBaseDto } from './dto/update-company-base.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '../../../helpers/utils';
import { CompanyBaaseDto } from './dto/company-baase-dto';

@Controller('company')
@ApiTags('Company')
export class CompanyBaseController {
  constructor(private readonly companyBaseService: CompanyBaseService) {}

  @ApiResponse({type: CompanyBaaseDto, status: 201})
  @Post()
  async create(@Body() createCompanyBaseDto: CreateCompanyBaseDto) {
    return await this.companyBaseService.create(createCompanyBaseDto);
  }

  @Get()
  async findAll() {
    return await this.companyBaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param() {id}: FindOneParams) {
    return await this.companyBaseService.findOne(id);
  }

  @Patch(':id')
  async update(@Param() {id}: FindOneParams, @Body() updateCompanyBaseDto: UpdateCompanyBaseDto) {
    return await this.companyBaseService.update(id, updateCompanyBaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companyBaseService.remove(+id);
  }
}
