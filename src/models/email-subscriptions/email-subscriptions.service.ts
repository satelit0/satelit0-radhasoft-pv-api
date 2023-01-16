import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { UpdateEmailSubscriptionDto } from './dto/update-email-subscription.dto';
import { EmailSubscription } from './entities/email-subscription.entity';
import { EmailSubscriptionDto } from './dto/email-subscription.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EmailSubscriptionsService {

  constructor(
    @InjectRepository(EmailSubscription) private readonly emailSubscriptionRepository: Repository<EmailSubscription>,
  ){}

  addSubscriber(emailSubscriptionDto: CreateEmailSubscriptionDto) {
    const esubsc = this.emailSubscriptionRepository.create({...emailSubscriptionDto});
    return this.emailSubscriptionRepository.save(esubsc);
  }

  getdAllSubscriber() {
    const esubs =  this.emailSubscriptionRepository.findAndCount()
    return esubs;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailSubscription`;
  }

  update(id: number, updateEmailSubscriptionDto: UpdateEmailSubscriptionDto) {
    return `This action updates a #${id} emailSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailSubscription`;
  }
}
