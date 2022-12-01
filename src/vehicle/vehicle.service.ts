import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleType } from './enum/vehicle-type';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return await this.vehicleModel.create(createVehicleDto);
  }

  async findAll(withinTwoDays = false): Promise<Vehicle[]> {
    const where: any = {};
    if (withinTwoDays) {
      where.createdAt = {
        $gte: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
      };
    }
    return await this.vehicleModel.find(where);
  }

  async findOne(id: string) {
    return await this.vehicleModel.findById(id);
  }

  async update(
    id: string,
    _updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    await this.vehicleModel.updateOne({ _id: id }, _updateVehicleDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.vehicleModel.deleteOne({ _id: id });
  }

  async getAveragePriceOfCar() {
    const data = await this.vehicleModel.aggregate([
      {
        $match: {
          type: VehicleType.CAR,
        },
      },
      {
        $group: {
          _id: null,
          avgCarAmount: {
            $avg: '$price',
          },
        },
      },
      {
        $unset: '_id',
      },
    ]);
    return data[0];
  }
}
