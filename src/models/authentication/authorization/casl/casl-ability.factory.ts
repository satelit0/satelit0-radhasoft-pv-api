import {
  RawRuleOf,
  Ability,
  ForcedSubject} from "@casl/ability";
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

const Actions = ['manage', 'create', 'read', 'update', 'delete'] as const;
const Subjects = ['all', 'User', 'Product', 'Existence', 'Category', 'Description', 'Supplier', 'Company', 'Subsidiary'] as const;

type Abilities = [
  typeof Actions[number],
  typeof Subjects[number] | ForcedSubject<Exclude<typeof Subjects[number], 'all'>>
];

export type AppAbility = Ability<Abilities>;

@Injectable()
export class CaslAbilityFactory {

  createForUser(user: User) {

    const permissionInterpolate: RawRuleOf<AppAbility>[] = interpolate(JSON.stringify(user.role.permissions), user);
    user.role.permissions = permissionInterpolate;

    console.log('============= ability ==>', user.role.permissions, user.role.permissions[1], user.userName, user.role.name);

    const createAbility = (rules: RawRuleOf<AppAbility>[]) => new Ability<Abilities>(rules);

    const ability = createAbility(permissionInterpolate);

    return ability;
  }

}