import {
  RawRuleOf,
  Ability,
  ForcedSubject,
  CreateAbility
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../../users/entities/user.entity";
import interpolate from "src/helpers/interpolate";

// interface IRawRule {
//   action: Action | Action[]
//   subject?: Subjects | Subjects[]
//   /** an array of fields to which user has (or not) access */
//   fields?: string[]
//   /** an object of conditions which restricts the rule scope */
//   conditions?: any
//   /** indicates whether rule allows or forbids something */
//   inverted?: boolean
//   /** message which explains why rule is forbidden */
//   reason?: string
// }


const Action = ['manage', 'create', 'read', 'update', 'delete'] as const;
const Subjects = ['all', 'User', 'Product', 'Existence', 'Category', 'Description', 'Supplier', 'Company', 'Subsidiary'] as const;

@Injectable()
export class CaslAbilityFactory {

  createForUser(user: User) {

    type Abilities = [
      typeof Action[number],
      typeof Subjects[number] | ForcedSubject<Exclude<typeof Subjects[number], 'all'>>
    ];
    type AppAbility = Ability<Abilities>;

    const createAbility = (rules: RawRuleOf<AppAbility>[]) => new Ability<Abilities>(rules);

    const permissionInterpolate: RawRuleOf<AppAbility>[] = interpolate(JSON.stringify(user.role.permissions), user);
    user.role.permissions = permissionInterpolate;

    if (user.role.name === 'sadmin') {
      // can('manage', 'all'); // read-write access to everything
    }
    else {
      // permissions_.forEach(p => {
      // can(p.action, p.subject, p.conditions);
      // });
    }
    const abilit = createAbility(permissionInterpolate);
    return abilit;
  }


}