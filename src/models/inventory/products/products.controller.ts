import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req, UseGuards, Query, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindOneParams } from '../../../helpers/utils';
import { Repository } from 'typeorm';
import { ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { IRequestWithUser, ITokenPayload } from 'src/models/interfaces/models.interface';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { use } from 'passport';
import { DescriptionService } from '../description/description.service';
import { CreateDescriptionDto } from '../description/dto/create-description.dto';
import { CreateExtistencePartialDto } from '../../entitys/entity';

const MSG = "Produto no existe",
  MSG_NAME_EXISTS = "Produto ya existe";


@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly descriptionService: DescriptionService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() req: IRequestWithUser) {

    const { name, existence } = createProductDto;

    const { subsidiaryId } = req.user;
    // if (!existence || existence.length === 0) {
    //   const newExistence: CreateExtistencePartialDto = {
    //     dateEntry: new Date(),
    //     dateExpire: new Date(),
    //     isActive: true,
    //     // productId: 0,
    //     qty: 0,
    //     subsidiaryId: user.subsidiaryId
    //   }
    //   createProductDto.existence = [newExistence]
    // }

    const newProduct = await this.productsService.create(createProductDto);

    return newProduct;

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    return await this.productsService.findAll(subsidiaryId);
  }


  @ApiParam({ name: 'id', type: Number })
  // @ApiQuery({ name: 'subsidiarId', type: String })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param() { id }: FindOneParams, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    const product = await this.productsService.findOne(id, subsidiaryId);
    if (!product) throw new HttpException(MSG, 404);
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  async findOneByName(@Param('name') name: string, @Req() request: IRequestWithUser) {
    const { subsidiaryId } = request.user;
    const product = await this.productsService.findOneBy({ name }, subsidiaryId);
    if (!product) throw new HttpException(MSG, 404);
    return product;
  }

  @Patch(':id')
  async update(@Param() { id }: FindOneParams, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(`${MSG}`, 400);
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete('removesoft/:id')
  async removeSoft(@Param() { id }: FindOneParams) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(MSG, 400);
    return await this.productsService.remove(id);
  }

  @Delete(':id')
  async remove(@Param() { id }: FindOneParams) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException(MSG, 400);
    return await this.productsService.remove(id);
  }

  @Patch('restore/:id')
  async restoreById(@Param() { id }: FindOneParams) {
    return await this.productsService.restore(id);
  }

}
