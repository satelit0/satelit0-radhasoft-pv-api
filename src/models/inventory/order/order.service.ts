import { Inject, Injectable, HttpException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductService } from '../products/product.service';
import { Detail } from '../details/entities/detail.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject('DataSource') private dataSource: DataSource,
    private productService: ProductService,
  ) { }

  async create(createOrderDto: CreateOrderDto,) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { items, subsidiaryId } = createOrderDto;
      //todo: obtener ncf
      const order = new Order();
      Object.assign(order, { ...createOrderDto });
      const newOrder = await queryRunner.manager.save(order);
      const orderId = (newOrder).id;

      const itemsDetails: Detail[] = [];
      for (const item of items) {

        const { productId, price } = item;

        const product = await this.productService.findOne(productId, subsidiaryId);
        if (product) {
          const { name, tax, cost, code} = product;
          if (price <= cost) throw new HttpException(`El articulo: ${name} no puede ser procesado, el precio ${price} no es valido. Item No.: ${code}`, 400);
          
          const detail = new Detail();
          Object.assign(detail, { orderId, name, tax, ...item });
          itemsDetails.push(detail);
        }

      }

      await queryRunner.commitTransaction()
      return 'This action adds a new order';
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
