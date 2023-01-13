import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../interfaces/policy-handler.interface';
import { CHECK_POLICIES_KEY } from '../helpers/consts';

export const CheckPolicies = (...handler: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, handler);
