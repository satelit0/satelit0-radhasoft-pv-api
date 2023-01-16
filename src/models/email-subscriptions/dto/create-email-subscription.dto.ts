import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { EmailSubscriptionDto } from './email-subscription.dto';
export class CreateEmailSubscriptionDto extends OmitType(EmailSubscriptionDto, ['id']){
  @ApiProperty({name:'name', type: String})
  name: string;
  
  @ApiProperty({name:'email', type: String})
  email: string;
}
