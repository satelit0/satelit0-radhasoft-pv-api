import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactDto } from './dto/contact-dto';
import { FindOneParams } from '../../helpers/utils';
import { Contact } from './entities/contact.entity';

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiBody({
    type: CreateContactDto
  })
  @ApiResponse({
    status: 201,
    type: ContactDto,
    description: 'Contacto creado exitosamente'
  })
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }

  @Get()
  async findAll() {
    return await this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param() {id}: FindOneParams) {
    return await this.contactService.findOne(id);
  }

  @Get('office-number/:officeNumber')
  async findOneByOfficeNumber(@Param('officeNumber') officeNumber: string) {
    const contact: Contact = {...await this.contactService.findOneByOfficeNumber(officeNumber)}[0];
    return contact;
  }

  @Get('socialNetworks/:socialNetworks')
  async findOneBysocialNetworks(@Param('socialNetworks') socialNetworks: string) {
    const contact: Contact = {...await this.contactService.findOneBySocialNetworks(socialNetworks)}[0];
    return contact;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
