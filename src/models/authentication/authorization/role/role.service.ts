import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,

  ) { }

  create(createRoleDto: CreateRoleDto) {

    try {
      const role = this.roleRepository.create({ ...createRoleDto });
      const newRole = this.roleRepository.save(role);
      return newRole;
    } catch (error) {
      throw new HttpException(`${error.message}`, error.status);
    }

  }

  findAll() {
    const roles = this.roleRepository.find();
    return roles;
  }

  findOne(id: number) {
    const role = this.roleRepository.findOne({ where: { id } });
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {

    const role = this.roleRepository.create({ ...updateRoleDto });
    const roleEdit = this.roleRepository.update(id, role);

    return roleEdit;
  }

  remove(id: number, sfot: boolean = true) {
    if (sfot) return this.roleRepository.softDelete(id);
    return this.roleRepository.delete(id);
  }

  restore(id: number) {
    const role = this.roleRepository.restore(id);
    return role;
  }
}
