import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseInterceptors, SerializeOptions } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactDto } from './dto/contact-dto';
import { FindOneParams, httpErrotHandler } from '../../helpers/utils';
import { Contact } from './entities/contact.entity';
import { ExcludeNullInterceptor } from '../../helpers/exclude-null.interceptor';

@SerializeOptions({strategy: 'exposeAll'})
// @UseInterceptors(ExcludeNullInterceptor)
@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

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
    try {
      const socialStorageValidate: string[] = [];
      const { email, socialNetworks } = createContactDto;
      const emailExists = await this.contactService.findOneBy({ email });
      if (emailExists) throw new HttpException(`email ya esta registrado`, 400);

      if (socialNetworks.whatsapp) {
        const whatsappExists = await this.contactService.findOneBySocialNetworks(socialNetworks.whatsapp);
        if (whatsappExists[0]) socialStorageValidate.push(" whatsapp: "+socialNetworks.whatsapp);
      }
      if (socialNetworks.facebook) {
        const facebookExists = await this.contactService.findOneBySocialNetworks(socialNetworks.facebook);
        if (facebookExists[0]) socialStorageValidate.push(" facebook: "+socialNetworks.facebook);
      }
      if (socialNetworks.telegram) {
        const telegramExists = await this.contactService.findOneBySocialNetworks(socialNetworks.telegram);
        if (telegramExists[0]) socialStorageValidate.push(" telegram: "+socialNetworks.telegram);
      }
      if (socialNetworks.twetter) {
        const twetterExists = await this.contactService.findOneBySocialNetworks(socialNetworks.twetter);
        if (twetterExists[0]) socialStorageValidate.push(" twetter: "+socialNetworks.twetter);
      }
      if (socialStorageValidate.length > 0) throw new HttpException(`rede(s) social(es) que esta(n) en uso: ${socialStorageValidate}`, 400);

      return await this.contactService.create(createContactDto);

    } catch (error) {
      httpErrotHandler(error);
    }
  }

  @Get()
  async findAll() {
    return await this.contactService.findAll();
  }

  @Get(':id')
  async findOneById(@Param() { id }: FindOneParams) {
    return await this.contactService.findOne(id);
  }
  @Get('email/:email')
  async findOne(@Param('eamil') email: string) {
    return await this.contactService.findOneBy({ email });
  }

  @Get('office-number/:officeNumber')
  async findOneByOfficeNumber(@Param('officeNumber') officeNumber: string) {
    const contact: Contact = { ...await this.contactService.findOneByOfficeNumber(officeNumber) }[0];
    return contact;
  }

  @Get('socialNetworks/:socialNetworks')
  async findOneBysocialNetworks(@Param('socialNetworks') socialNetworks: string) {
    const contact: Contact = { ...await this.contactService.findOneBySocialNetworks(socialNetworks) }[0];
    return contact;
  }

  @Patch(':id')
  update(@Param() {id}: FindOneParams, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param() {id}: FindOneParams) {
    return this.contactService.remove(id);
  }
}
