import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, ForbiddenException, ParseIntPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ExistenceService } from './existence.service';
import { CreateExistenceDto } from './dto/create-existence.dto';
import { UpdateExistenceDto } from './dto/update-existence.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { IRequestWithUser } from 'src/models/interfaces/models.interface';
import { ForbiddenError, subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../authentication/authorization/casl/casl-ability.factory';
import { resources } from '../../../helpers/consts';

@Controller('existence')
@ApiTags('Existencias')
export class ExistenceController {
  constructor(
    private readonly existenceService: ExistenceService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) { }

  @Post()
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new CreateExistenceCheck())
  @UseGuards(JwtAuthGuard)
  create(@Body() createSubsidiaryExistenceDto: CreateExistenceDto, @Req() request: IRequestWithUser) {
    try {
      const { user } = request;
      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).setMessage(resources.access_denied).throwUnlessCan('create', subject('Existence', createSubsidiaryExistenceDto));
      // return this.existenceService.create(createSubsidiaryExistenceDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  @Get()
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new ReadExistenceCheck())
  @UseGuards(JwtAuthGuard)
  findAll(@Req() request: IRequestWithUser) {
    try {
      const { user } = request;
      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).setMessage(resources.access_denied).throwUnlessCan('read', 'Existence');

      let isSadmin: boolean;
      if (['sadmin'].includes(user.role.name)) isSadmin = true;

      return this.existenceService.findAll({ subsidiaryId: user.subsidiaryId, isSadmin: isSadmin });

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
    }
  }

  @Get(':id')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new ReadExistenceCheck())
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() request: IRequestWithUser) {
    try {
      const { user } = request;

      const existence = await this.existenceService.findOne(id);

      if (!existence) throw new HttpException(`recurso ${resources.not_found}`, 404);

      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).setMessage(resources.access_denied).throwUnlessCan('read', subject('Existence', existence));

      return existence;

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  @Patch(':id')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new PatchExistenceCheck())
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateSubsidiaryExistenceDto: UpdateExistenceDto) {
    return this.existenceService.update(+id, updateSubsidiaryExistenceDto);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'soft', type: Boolean})
  @Delete('remove/:id')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new DeleteExistenceCheck())
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number, @Query('soft') soft: boolean, @Req() request: IRequestWithUser) {
    try {
      const { user } = request;
      const existence = await this.existenceService.findOne(id);
      if (!existence) throw new HttpException(`recurso ${resources.not_found}`, 404);
      
      const ability = this.caslAbilityFactory.createForUser(user);
      ForbiddenError.from(ability).throwUnlessCan('delete', subject('Existence', existence));
      
      return this.existenceService.remove(id, soft);

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
      throw new HttpException(`${error.message}`, error.status);
    }
  }

  @Patch('restore/:id')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new PatchExistenceCheck())
  @UseGuards(JwtAuthGuard)
  async restore(id: number, @Req() request: IRequestWithUser) {
    try {
      const { user } = request;

      const ability = this.caslAbilityFactory.createForUser(user);
      const existence = await this.existenceService.findOne(id);

      ForbiddenError.from(ability).setMessage(resources.access_denied).throwUnlessCan('read', subject('Existence', existence));

      if (!existence) throw new HttpException(`recurso ${resources.not_found}`, 404);

      this.existenceService.restore(id);

    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(`${error.message}`);
      }
      throw new HttpException(`${error.message}`, error.status);
    }
  }
}
