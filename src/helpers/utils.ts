import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsNumberString } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export const toTrim = (str: string): string => typeof str !== 'string' ? str : str.trim();

export const httpErrotHandler = (error: HttpException) => { 
  throw new HttpException(error.getStatus() == 500 ? `se produjo un error inesperado. ${error.message}` : error.message, error.getStatus()); 
}

