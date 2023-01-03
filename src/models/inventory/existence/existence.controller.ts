import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { CreateExistenceDto } from './dto/create-existence.dto';
import { UpdateExistenceDto } from './dto/update-existence.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';

@Controller('existence')
@ApiTags('Existencias')
export class ExistenceController {
  constructor(private readonly subsidiaryExistenceService: ExistenceService) {}

  @Post()
  create(@Body() createSubsidiaryExistenceDto: CreateExistenceDto) {
    return this.subsidiaryExistenceService.create(createSubsidiaryExistenceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: IRequestWithUser) {
    const {subsidiaryId} = request.user;
    return this.subsidiaryExistenceService.findAll(subsidiaryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subsidiaryExistenceService.findOne(+id);
  }

  // @Get('')
  // findOneBy(@Param('id') id: string) {
  //   return this.subsidiaryExistenceService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubsidiaryExistenceDto: UpdateExistenceDto) {
    return this.subsidiaryExistenceService.update(+id, updateSubsidiaryExistenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subsidiaryExistenceService.remove(+id);
  }
}
