import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query, ParseIntPipe, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { FindOneParams } from '../../../helpers/utils';
import { PerformApproval } from './dto/approval-req.dto';

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

  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() { id }: FindOneParams, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;

    const order = await this.orderService.findOne(id, subsidiaryId);
    if (!order) throw new HttpException(`Orden No.: ${id} no existe`, 404);
    return order;
    
  }

  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @ApiParam({ name: 'id', description: 'identificador de la orden', type: Number })
  @ApiQuery({ name: 'soft', description: 'si true eliminado suave', type: Boolean, required: false })
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

  @ApiParam({ name: 'id', type: Number, description: 'identificador de la orden' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Patch('perform-approval/:id')
  async approvalRequest(@Param('id', ParseIntPipe) id: number, @Body() performApproval: PerformApproval, @Req() request: IRequestWithUser) {
    const { id: userAuthorizeId } = request.user;
    const { amountApproval, approvalId } = performApproval;
    await this.orderService.performApproval({ orderId: id, userAuthorizeId, amountApproval, approvalId });
  }

}
