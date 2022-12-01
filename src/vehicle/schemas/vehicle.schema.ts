import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VehicleType } from '../enum/vehicle-type';

@Schema({
  timestamps: true,
})
export class Vehicle {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  type: VehicleType;
}

type VehicleDocument = Vehicle & Document;

const VehicleSchema = SchemaFactory.createForClass(Vehicle);

export { VehicleSchema, VehicleDocument };
