import { DataSource } from 'typeorm';
import { CategoryProduct } from './models/category-product/entities/category-product.entity';
import { Contact } from './models/contact/entities/contact.entity';
import { DescriptionProduct } from './models/description-product/entities/description-product.entity';
import { Detail } from './models/details/entities/detail.entity';
import { Order } from './models/order/entities/order.entity';
import { Person } from './models/person/entities/person.entity';
import { Product } from './models/products/entities/product.entity';
import { Supplier } from './models/supplier/entities/supplier.entity';
import { User } from './models/users/entities/user.entity';

export const DatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: "pv",
        entities: [
          User, 
          Person, 
          Contact, 
          Supplier, 
          Product,
          CategoryProduct, 
          DescriptionProduct,
          Order, 
          Detail,   
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];