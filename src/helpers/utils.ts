import { Type } from 'class-transformer';
import { IsNumber, IsNumberString } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export const toTrim = (str: string): string => typeof str !== 'string' ? str : str.trim();
