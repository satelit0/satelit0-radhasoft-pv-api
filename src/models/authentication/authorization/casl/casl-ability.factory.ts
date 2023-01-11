import { PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, defineAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
// import { Action } from "rxjs/internal/scheduler/Action";
import { User } from "../../users/entities/user.entity";
import { Product } from '../../../inventory/products/entities/product.entity';
import { Existence } from '../../../inventory/existence/entities/existence.entity';
import { CompanyBase } from '../../../company/company-base/entities/company-base.entity';
import { Subsidiary } from '../../../company/subsidiary/entities/subsidiary.entity';


// export enum Action {
//   Manage = 'manage',
//   Create = 'create',
//   Read = 'read',
//   Update = 'update',
//   Delete = 'delete',
// }
export type Action ='manage' |'create' | 'read' | 'update' | 'delete';
// export type Subjects = 'all' | 'User' | 'Product' | 'Existence' | 'Category' | 'Description' | 'Supplier' | 'Company' | 'Subsidiary';

type Subjects = InferSubjects<typeof Product | typeof User | typeof Existence | typeof CompanyBase | typeof Subsidiary | 'all'>;

interface DbPermission {
  action: Action;
  subjects: string; 
  condition: {};
}

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {


  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    const permissions: DbPermission[] = user.role.permissions as [];

    const dbPermissions = permissions.map(p => ({
      action: p.action,
      subjects: p.subjects,
      condition: p.condition,
    }));

    console.log('=======>', dbPermissions);
    

    if (user.role.name === 'admin') {
      can('manage', 'all'); // read-write access to everything
    } else {
      can('read', 'all'); // read-only access to everything
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

   

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });


  }


}