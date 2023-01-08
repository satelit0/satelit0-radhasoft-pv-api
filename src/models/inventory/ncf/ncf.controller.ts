import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { NcfService } from './ncf.service';
import { CreateNcfDto } from './dto/create-ncf.dto';
import { UpdateNcfDto } from './dto/update-ncf.dto';
import { ApiTags } from '@nestjs/swagger';
import { TypeNCF } from '../../../helpers/enums';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';

@Controller('ncf')
@ApiTags('Comprobantes Ficales')
export class NcfController {
  constructor(private readonly ncfService: NcfService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createNcfDto: CreateNcfDto, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = createNcfDto;
    if (!subsidiaryId || subsidiaryId == 0) createNcfDto.subsidiaryId = request.user.subsidiaryId;
    return await this.ncfService.create(createNcfDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.ncfService.findAll(subsidiaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return this.ncfService.findOne(id, subsidiaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('numberncfbytype/:typeNcf')
  async findOneByType(@Param('typeNcf') typeNcf: TypeNCF, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    const numberNcf = await this.ncfService.getNumberNcf({ typeNcf, subsidiaryId });
    return numberNcf;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNcfDto: UpdateNcfDto, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.ncfService.update(id, updateNcfDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.ncfService.remove(id);
  }
}
