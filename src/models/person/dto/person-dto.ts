import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsISO8601, Allow, IsInt, Min, IsDateString } from "class-validator";
import { Roles } from "src/helpers/enums";
import { toTrim } from "src/helpers/utils";

export class PersonDto {
  // @IsString({ message: "El valor para nameEntity debe ser una cadena de caracteres" })
  // @IsNotEmpty({ message: "Propiedad nameEntity no puede estar vacio" })
  // @Transform(({ value }) => toTrim(value))
  // nameEntity: string;
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: 'number',
    // format: ''
  })
  id: number;

  @IsString()
  @IsNotEmpty({ message: "Si se provee firstName debe proveer un a valor" })
  @Transform(({ value }) => toTrim(value))
  firstName: string;

  
  @IsString()
  @IsNotEmpty({ message: "Si se provee lastName debe proveer un a valor" })
  @Transform(({ value }) => toTrim(value))
  lastName: string;

  @IsISO8601()
  birthday: Date;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt: Date;

}
