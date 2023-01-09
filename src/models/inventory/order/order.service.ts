import { Inject, Injectable, HttpException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { ProductService } from '../products/product.service';
import { Detail } from '../details/entities/detail.entity';
import { runInThisContext } from 'vm';
import { OrderType, PaymentMethod, StatusOrderDelivery, StatusOrderPay, TypeNCF, StatusApproval } from '../../../helpers/enums';
import { NcfService } from '../ncf/ncf.service';
import { DetailsService } from '../details/details.service';
import { ApprovalsService } from '../../administrative/approvals/approvals.service';
import { Approval } from '../../administrative/approvals/entities/approval.entity';
import { nanoid } from 'nanoid/async';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject('DataSource') private dataSource: DataSource,
    private productService: ProductService,
    private ncfService: NcfService,
    private detailsService: DetailsService,
    private approvalsService: ApprovalsService,

  ) { }

  async create(createOrderDto: CreateOrderDto,) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { items, subsidiaryId, orderType } = createOrderDto;
      //todo: obtener ncf
      const itemsDetails: Detail[] = [];
      const order = new Order();
      Object.assign(order, { ...createOrderDto });
      const newOrder = await queryRunner.manager.save(order);
      const orderId = (newOrder).id;

      if (orderType === OrderType.CASH) { }


      for (const item of items) {
        const { productId, price } = item;

        const product = await this.productService.findOne(productId, subsidiaryId);
        const { name, tax, cost, code, existences } = product;

        if (existences[0].qty <= 0) throw new HttpException(`El articulo: ${name} no puede ser procesado, cantidad agotada: ${existences[0].qty}. Item No.: ${code}`, 400);

        if (price <= cost) throw new HttpException(`El articulo: ${name} no puede ser procesado, el precio ${price} no es valido. Item No.: ${code}`, 400);

        const detail = new Detail();
        Object.assign(detail, { orderId, name, tax, ...item });
        itemsDetails.push(detail);

      }

      const details = await queryRunner.manager.save(itemsDetails);

      await queryRunner.commitTransaction();
      return { ...newOrder, details };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, error.status);
    } finally {
      await queryRunner.release();
    }
  }


  async receivePaymentOrder(params: {
    amount: number,
    orderId: number,
    subsidiaryId: number,
    paymentMethod: PaymentMethod,
    typeNcf?: TypeNCF
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { amount, orderId, subsidiaryId, typeNcf = TypeNCF.FINAL_CONSUMER, paymentMethod } = params;

      const order = await this.orderRepository.findOne({
        where: { id: orderId, subsidiaryId },
        relations: {
          client: true,
          detail: true,
        }
      });

      const { orderType, authorizationCode, amountPaid } = order;

      if (![PaymentMethod.CASH, PaymentMethod.CREDIT_CARD].includes(paymentMethod) && authorizationCode === null)
        throw new HttpException(`Transacción de pago no validada, espere autorización`, 400);

      const ncf = await this.ncfService.setAndReturnNumberNcfByType({ queryRunner, typeNcf, subsidiaryId });

      const totalDetail = await this.detailsService.getTotalDetails(orderId);

      const currentAmount = amountPaid + amount;
      let statusPay: StatusOrderPay, statusDelivery: StatusOrderDelivery;

      if (totalDetail <= currentAmount) {
        statusPay = StatusOrderPay.COMPLETE;
        statusDelivery = StatusOrderDelivery.STATUS_HANDLING;
      };

      const orderUpdated = await queryRunner.manager.update(Order, { id: orderId }, {
        paymentMethod,
        typeNcf,
        ncf,
        amountPaid: currentAmount,
        statusPay,
        statusDelivery,
      });



      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async performApproval(params: {
    orderId: number,
    approvalId: number,
    userAuthorizeId: number,
    statusApproval: StatusApproval,
    amountApproval: number,
    queryRunner: QueryRunner
  }) {

    try {
      const { orderId, approvalId, userAuthorizeId, statusApproval, amountApproval, queryRunner } = params;
      // const approvalRequest = await this.approvalsService.findOne()
      const authorizationCode = await nanoid(10);
      const approval = await queryRunner.manager.update(Approval, approvalId, {
        authorizationCode,
        userAuthorizeId,

      });


    } catch (error) {

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

    if (soft) return this.orderRepository.softDelete(id);

    return this.orderRepository.delete(id);
  }

  restore(id: number) {
    return this.orderRepository.restore(id);
  }
}
