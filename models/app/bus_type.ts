import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBus, AppBusId } from './app_bus';
import type { AppTrip, AppTripId } from './app_trip';
import type { TripBus, TripBusId } from './trip_bus';

export interface BusTypeAttributes {
  typeId: number;
  typeName: string;
  seats: number;
  seatMap?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type BusTypePk = "typeId";
export type BusTypeId = BusType[BusTypePk];
export type BusTypeOptionalAttributes = "typeId" | "seatMap" | "createdAt" | "updatedAt";
export type BusTypeCreationAttributes = Optional<BusTypeAttributes, BusTypeOptionalAttributes>;

export class BusType extends Model<BusTypeAttributes, BusTypeCreationAttributes> implements BusTypeAttributes {
  typeId!: number;
  typeName!: string;
  seats!: number;
  seatMap?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // BusType hasMany AppBus via typeId
  appBuses!: AppBus[];
  getAppBuses!: Sequelize.HasManyGetAssociationsMixin<AppBus>;
  setAppBuses!: Sequelize.HasManySetAssociationsMixin<AppBus, AppBusId>;
  addAppBus!: Sequelize.HasManyAddAssociationMixin<AppBus, AppBusId>;
  addAppBuses!: Sequelize.HasManyAddAssociationsMixin<AppBus, AppBusId>;
  createAppBus!: Sequelize.HasManyCreateAssociationMixin<AppBus>;
  removeAppBus!: Sequelize.HasManyRemoveAssociationMixin<AppBus, AppBusId>;
  removeAppBuses!: Sequelize.HasManyRemoveAssociationsMixin<AppBus, AppBusId>;
  hasAppBus!: Sequelize.HasManyHasAssociationMixin<AppBus, AppBusId>;
  hasAppBuses!: Sequelize.HasManyHasAssociationsMixin<AppBus, AppBusId>;
  countAppBuses!: Sequelize.HasManyCountAssociationsMixin;
  // BusType hasMany AppTrip via busTypeId
  appTrips!: AppTrip[];
  getAppTrips!: Sequelize.HasManyGetAssociationsMixin<AppTrip>;
  setAppTrips!: Sequelize.HasManySetAssociationsMixin<AppTrip, AppTripId>;
  addAppTrip!: Sequelize.HasManyAddAssociationMixin<AppTrip, AppTripId>;
  addAppTrips!: Sequelize.HasManyAddAssociationsMixin<AppTrip, AppTripId>;
  createAppTrip!: Sequelize.HasManyCreateAssociationMixin<AppTrip>;
  removeAppTrip!: Sequelize.HasManyRemoveAssociationMixin<AppTrip, AppTripId>;
  removeAppTrips!: Sequelize.HasManyRemoveAssociationsMixin<AppTrip, AppTripId>;
  hasAppTrip!: Sequelize.HasManyHasAssociationMixin<AppTrip, AppTripId>;
  hasAppTrips!: Sequelize.HasManyHasAssociationsMixin<AppTrip, AppTripId>;
  countAppTrips!: Sequelize.HasManyCountAssociationsMixin;
  // BusType hasMany TripBus via busTypeId
  tripBuses!: TripBus[];
  getTripBuses!: Sequelize.HasManyGetAssociationsMixin<TripBus>;
  setTripBuses!: Sequelize.HasManySetAssociationsMixin<TripBus, TripBusId>;
  addTripBus!: Sequelize.HasManyAddAssociationMixin<TripBus, TripBusId>;
  addTripBuses!: Sequelize.HasManyAddAssociationsMixin<TripBus, TripBusId>;
  createTripBus!: Sequelize.HasManyCreateAssociationMixin<TripBus>;
  removeTripBus!: Sequelize.HasManyRemoveAssociationMixin<TripBus, TripBusId>;
  removeTripBuses!: Sequelize.HasManyRemoveAssociationsMixin<TripBus, TripBusId>;
  hasTripBus!: Sequelize.HasManyHasAssociationMixin<TripBus, TripBusId>;
  hasTripBuses!: Sequelize.HasManyHasAssociationsMixin<TripBus, TripBusId>;
  countTripBuses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof BusType {
    return sequelize.define('BusType', {
    typeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'type_id'
    },
    typeName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'type_name'
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seatMap: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'seat_map'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'bus_types',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  }) as typeof BusType;
  }
}
