import { IPolicyHandler } from 'src/interfaces/policy-handler.interface';
import { AppAbility } from 'src/models/authentication/authorization/casl/casl-ability.factory';

export class DeleteExistenceCheck implements IPolicyHandler{
  handle(ability: AppAbility): boolean {
    return ability.can('delete', 'Existence');
  }

}