import { CategoryProduct } from 'src/models/category-product/entities/category-product.entity';
import { Contact } from 'src/models/contact/entities/contact.entity';
import { DescriptionProduct } from 'src/models/description-product/entities/description-product.entity';
import { Detail } from 'src/models/details/entities/detail.entity';
import { Order } from 'src/models/order/entities/order.entity';
import { Person } from 'src/models/person/entities/person.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { Supplier } from 'src/models/supplier/entities/supplier.entity';
import { User } from 'src/models/users/entities/user.entity';
import { DataSource } from 'typeorm';

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