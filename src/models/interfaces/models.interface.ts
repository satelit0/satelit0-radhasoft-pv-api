import { ApiProperty } from "@nestjs/swagger";

export interface IDevice {
  id?: number;
  name?: string;
  subsidiaryId?: number;
  macAddress?: string;
  operativeSystem?: string;
  createdAt?: Date;
  updatedat?: Date;
  deletedAt?: Date;
}

