import { IsNotEmpty, IsEnum, Max } from 'class-validator';
import { VehicleType } from '../enum/vehicle-type';

export class CreateVehicleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Max(100000000000)
  price: number;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  type: VehicleType;
}
