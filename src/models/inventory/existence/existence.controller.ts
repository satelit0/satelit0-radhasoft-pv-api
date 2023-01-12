import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, ForbiddenException, ParseIntPipe, Query } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { CreateExistenceDto } from './dto/create-existence.dto';
import { UpdateExistenceDto } from './dto/update-existence.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { ForbiddenError, subject } from '@casl/ability';
import { create } from 'lodash';
import { CaslAbilityFactory } from '../../authentication/authorization/casl/casl-ability.factory';
import { Existence } from './entities/existence.entity';

@Controller('existence')
@ApiTags('Existencias')
export class ExistenceController {
  constructor(
    private readonly existenceService: ExistenceService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSubsidiaryExistenceDto: CreateExistenceDto, @Req() request: IRequestWithUser) {
    try {
      const { user } = request;

      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).throwUnlessCan('create', subject('Existence', createSubsidiaryExistenceDto));
      return this.existenceService.create(createSubsidiaryExistenceDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: IRequestWithUser) {
    try {
      const { user } = request;
      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).setMessage('Sin acceso a este recurso').throwUnlessCan('read', subject('Existence', user));
      return this.existenceService.findAll(user.subsidiaryId);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.existenceService.findOne(+id);
  }

  // @Get('')
  // findOneBy(@Param('id') id: string) {
  //   return this.subsidiaryExistenceService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubsidiaryExistenceDto: UpdateExistenceDto) {
    return this.existenceService.update(+id, updateSubsidiaryExistenceDto);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'soft', type: Boolean, required: false })
  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Query('soft') soft: boolean, @Req() request: IRequestWithUser) {
    try {
      const { user } = request;
      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).setMessage('No puede eliminar este recurso, no posee permisos').throwUnlessCan('delete', 'Existence');
      return this.existenceService.remove(id, soft);

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
      throw new HttpException(`${error.message}`, error.status);

    }
  }
}
