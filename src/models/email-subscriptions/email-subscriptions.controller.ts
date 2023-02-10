import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailSubscriptionsService } from './email-subscriptions.service';
import { CreateEmailSubscriptionDto } from './dto/create-email-subscription.dto';
import { UpdateEmailSubscriptionDto } from './dto/update-email-subscription.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('email-subscriptions')
@ApiTags('Email Subscriptions')
export class EmailSubscriptionsController {
  constructor(private readonly emailSubscriptionsService: EmailSubscriptionsService) {}

  @Post()
  create(@Body() createEmailSubscriptionDto: CreateEmailSubscriptionDto) {
    return this.emailSubscriptionsService.addSubscriber(createEmailSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.emailSubscriptionsService.getdAllSubscriber();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailSubscriptionDto: UpdateEmailSubscriptionDto) {
    return this.emailSubscriptionsService.update(+id, updateEmailSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailSubscriptionsService.remove(+id);
  }
}
