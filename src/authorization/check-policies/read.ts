import { IPolicyHandler } from 'src/interfaces/policy-handler.interface'; 
import { AppAbility } from '../../models/authentication/authorization/casl/casl-ability.factory';
import { Existence } from '../../models/inventory/existence/entities/existence.entity';

export  class ReadExistenceCheck implements IPolicyHandler{
  handle(ability: AppAbility): boolean {
    return ability.can('read', 'Existence');
  }
}