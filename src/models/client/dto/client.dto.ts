import { IsDateString, IsInt, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class ClientDto {
  @ApiProperty({name: 'id', type: Number})
  @IsInt()
  id: number;

  @ApiProperty({name: 'userId', type: Number})
  @IsInt()
  userId: number;

  @ApiProperty({name: 'personId', type: Number})
  @IsInt()
  personId: number;

  @ApiProperty({name: 'subsidiaryId', type: Number})
  @IsInt()
  subsidiaryId: number;

  @ApiProperty({name: 'createdAt', type: Date})
  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({name: 'updatedAt', type: Date})
  @IsDateString()
  @IsOptional()
  updatedAt: Date;
  
  @ApiProperty({name: 'deletedAt', type: Date})
  @IsDateString()
  @IsOptional()
  deletedAt: Date;
}