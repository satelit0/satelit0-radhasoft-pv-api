import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NcfService } from './ncf.service';
import { CreateNcfDto } from './dto/create-ncf.dto';
import { UpdateNcfDto } from './dto/update-ncf.dto';

@Controller('ncf')
export class NcfController {
  constructor(private readonly ncfService: NcfService) {}

  @Post()
  create(@Body() createNcfDto: CreateNcfDto) {
    return this.ncfService.create(createNcfDto);
  }

  @Get()
  findAll() {
    return this.ncfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ncfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNcfDto: UpdateNcfDto) {
    return this.ncfService.update(+id, updateNcfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ncfService.remove(+id);
  }
}
