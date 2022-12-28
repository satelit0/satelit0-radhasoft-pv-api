import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { CreateSubsidiaryExistenceDto } from './dto/create-existence.dto';
import { UpdateSubsidiaryExistenceDto } from './dto/update-existence.dto';

@Controller('subsidiary-existence')
export class ExistenceController {
  constructor(private readonly subsidiaryExistenceService: ExistenceService) {}

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
