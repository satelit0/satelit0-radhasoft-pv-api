import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Contact } from '../../contact/entities/contact.entity';
import { Person } from '../../person/entities/person.entity';
import { PersonService } from '../../person/person.service';
import { compare, hash } from 'bcrypt';
import { SALROUNDS } from 'src/helpers/consts';
import { IUser } from 'src/models/interfaces/models.interface';
import { DeviceService } from 'src/models/company/device/device.service';
import { CreateDeviceDto } from 'src/models/company/device/dto/create-device.dto';
import { Device } from 'src/models/company/device/entities/device.entity';
import { SubsidiaryService } from '../../company/subsidiary/subsidiary.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private personService: PersonService,
    private readonly subsidiaryService: SubsidiaryService,
    private deviceService: DeviceService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    const { deviceIds } = createUserDto;
    const devices: Device[] = [];

    if (deviceIds.length == 0) {
      const device = new CreateDeviceDto();
      device.subsidiaryId = createUserDto.subsidiaryId;
      device.name = "generic-device";
      device.operativeSystem = 'generic-os';
      device.macAddress = [];
      const newDevice = await this.deviceService.create(device);
      devices.push({ ...newDevice });
    } else {
      for (const deviceId of deviceIds) {
        const device = await this.deviceService.findOne({ id: deviceId });
        devices.push({ ...device });
      }
    }

    const user = this.userRepository.create({ ...createUserDto, devices: [...devices] });

    const newUser = await this.userRepository.save(user);
    return { newUser };
  }

  async findAll() {
    const users = await this.userRepository.find({
      select:
      {
        id: true,
        userName: true,
        personId: true,
        roleId: true,
        subsidiaryId: true,
        // devicesId: true,
        password: false,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      relations: {
        role: true,
        person: {
          contact: true,
        },
        devices: true,
      },
    });

    return users;
  }

  findOne(id: number, withDeleted: boolean = false) {

    const user = this.userRepository.findOne({
      // loadRelationIds: true,
      where: { id },
      relations: {
        role: true,
      },
      withDeleted
    });

    return user;
  }

  findOneBy(params: IUser) {
    const user = this.userRepository.findOne({
      where: { ...params },
      relations: {
        role: true,
        person: true,
        devices: true,
      }
    });
    return user;
  }

  findOneByEmail(email: string): Promise<User> {

    const user = <Promise<User>>this.userRepository.query(
      `select * from person p 
	      left join contact c 
	      on p."contactId" = c.id and (p."deletedAt" is null) and (p."deletedAt" is  null)
	      left join "user" "users" 
	      on p.id = "users"."personId"
	      where c.email = $1 and ("users"."deletedAt" is  null);`, [email]
    );

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const { password } = updateUserDto;

    if (password) {
      const passwordHash = await hash(password, SALROUNDS);
      updateUserDto.password = passwordHash;
    }

    const user = this.userRepository.create(updateUserDto);
    const userEdited = this.userRepository.update(id, user);
    // return userEdited;
    return user;
  }

  remove(id: number, soft: boolean = true) {
    if (soft) return this.userRepository.softDelete(id);
    return this.userRepository.delete(id);
  }

  restore(id: number) {
    this.userRepository.restore(id);
  }

  async setCurrentRefreshToken(params: { refreshToken: string, userId: number }) {
    const { refreshToken, userId } = params;
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const isRefreshTokenMatching = await compare(refreshToken, user.currentHashedRefreshToken);

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null
    });
  }
}
