import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { FindOneParams } from '../../../helpers/utils';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';

@Controller('details')
@ApiTags('Details')

export class DetailsController {
  constructor(private readonly detailsService: DetailsService) { }


  // @Post()
  // create(@Body() createDetailDto: CreateDetailDto) {
  //   return this.detailsService.create(createDetailDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return this.detailsService.findAll(subsidiaryId);
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() { id }: FindOneParams, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.detailsService.findOne(id, subsidiaryId);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateDetailDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param() { id }: FindOneParams, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailsService.update(id, updateDetailDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.detailsService.remove(+id);
  // }
}
