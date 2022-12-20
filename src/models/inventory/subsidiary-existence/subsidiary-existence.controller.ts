import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubsidiaryExistenceService } from './subsidiary-existence.service';
import { CreateSubsidiaryExistenceDto } from './dto/create-subsidiary-existence.dto';
import { UpdateSubsidiaryExistenceDto } from './dto/update-subsidiary-existence.dto';

@Controller('subsidiary-existence')
export class SubsidiaryExistenceController {
  constructor(private readonly subsidiaryExistenceService: SubsidiaryExistenceService) {}

  @Post()
  create(@Body() createSubsidiaryExistenceDto: CreateSubsidiaryExistenceDto) {
    return this.subsidiaryExistenceService.create(createSubsidiaryExistenceDto);
  }

  @Get()
  findAll() {
    return this.subsidiaryExistenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subsidiaryExistenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubsidiaryExistenceDto: UpdateSubsidiaryExistenceDto) {
    return this.subsidiaryExistenceService.update(+id, updateSubsidiaryExistenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subsidiaryExistenceService.remove(+id);
  }
}
