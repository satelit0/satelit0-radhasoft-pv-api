import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { Any, ArrayContainedBy, ArrayContains, In, Repository } from 'typeorm';
import { DeviceDto } from './dto/device-dto';
import { IDevice } from '../../../models/interfaces/models.interface';

@Injectable()
export class DeviceService {

  constructor(
    @InjectRepository(Device) private repositoryDevice: Repository<Device>
  ) { }

  create(createDeviceDto: CreateDeviceDto) {
    const device = this.repositoryDevice.create(createDeviceDto);
    const newDevice = this.repositoryDevice.save(device);
    return newDevice;
  }

  findAll() {
    const devices = this.repositoryDevice.find({
      relations: {
        subsidiary: true,
      }
    });
    return devices;
  }

  /**
   * 
   * @param Param params: IDevice 
   * @returns Promise<Device>
   */
  findOne(param: IDevice) {
    const device = this.repositoryDevice.findOne({
      where: { ...param },
      relations: {
        subsidiary: true,
      } 
    });
    return device;
  }
  
  findOneByMacAddress(macAddress: string) {
    const device = this.repositoryDevice.query(
      `select * from Device where $1 = any ("macAddress")`, [macAddress]
    );
    return device;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const deviceEdit = this.repositoryDevice.create(updateDeviceDto);
    const device = this.repositoryDevice.update(id, deviceEdit);
    return device;
  }

  remove(id: number, soft: boolean = true) {
    if (soft) return this.repositoryDevice.softDelete(id);
    return this.repositoryDevice.delete(id);
  }

  restore(id: number) {
    return this.repositoryDevice.restore(id);
  }
}
