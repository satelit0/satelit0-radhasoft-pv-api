import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { FindOneParams } from '../../../helpers/utils';

@Controller('order')
@ApiTags('Order')

export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() request: IRequestWithUser) {
    const { subsidiaryId, id } = request.user;
    createOrderDto.subsidiaryId = subsidiaryId;
    createOrderDto.userId = id;
    return await this.orderService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.orderService.findAll(subsidiaryId);
  }


  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() { id }: FindOneParams, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.orderService.findOne(id, subsidiaryId);
  }

  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number })
  @ApiQuery({ name: 'soft', description: 'si true eliminado suave', type: Boolean, required: false})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() { id }: FindOneParams, @Query('soft') soft: boolean) {
    return await this.orderService.remove(id, soft);
  }

  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number })
  @UseGuards(JwtAuthGuard)
  @Patch('restore/:id')
  async restore(@Param() { id }: FindOneParams) {
    return await this.orderService.restore(id);
  }
}
