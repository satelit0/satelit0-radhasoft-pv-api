import { Inject, Injectable, HttpException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductService } from '../products/product.service';
import { Detail } from '../details/entities/detail.entity';
import { runInThisContext } from 'vm';

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
      const { items, subsidiaryId, } = createOrderDto;
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
          const { name, tax, cost, code } = product;
          if (price <= cost) throw new HttpException(`El articulo: ${name} no puede ser procesado, el precio ${price} no es valido. Item No.: ${code}`, 400);

          const detail = new Detail();
          Object.assign(detail, { orderId, name, tax, ...item });
          itemsDetails.push(detail);
        }

      }
      const details = await queryRunner.manager.save(itemsDetails);

      await queryRunner.commitTransaction()
      return { ...newOrder, details };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  findAll(subsidiaryId: number) {
    return this.orderRepository.findAndCount({
      where: { subsidiaryId },
      relations: {
        client: true,
        detail: true,
      }
    });
  }

  findOne(id: number, subsidiaryId: number,) {
    const order = this.orderRepository.findOne({
      where: { subsidiaryId, id },
      relations: {
        client: true,
        detail: true,
      }
    });
    return order;
  }

  getOrderById(id: number, withDeleted: boolean = false) {
    const order = this.orderRepository.findOne({ where: { id }, withDeleted });
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number, soft: boolean = true) {
    const order = await this.getOrderById(id, true);

    if (!order) throw new HttpException(`Orden No.: ${id}, existe`, 404);
    
    if (soft) return  this.orderRepository.softDelete(id);
    
    return this.orderRepository.delete(id);
  }

  restore(id: number) {
    return this.orderRepository.restore(id);
  }
}
