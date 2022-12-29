import { Contact } from 'src/models/contact/entities/contact.entity';
import { DescriptionProduct } from 'src/models/description-product/entities/description-product.entity';
import { Order } from 'src/models/inventory/order/entities/order.entity';
import { Person } from 'src/models/person/entities/person.entity';
import { Product } from 'src/models/inventory/products/entities/product.entity';
import { Supplier } from 'src/models/inventory/supplier/entities/supplier.entity';
import { User } from 'src/models/authentication/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { CategoryProduct } from 'src/models/inventory/category-product/entities/category-product.entity';
import { Detail } from '../models/inventory/details/entities/detail.entity';

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