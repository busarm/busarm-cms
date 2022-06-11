import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBus, AppBusId } from './app_bus';
import type { AppTrip, AppTripId } from './app_trip';

export interface TripBusAttributes {
  tripId: number;
  busTypeId: number;
  busId: number;
  agentId: number;
  partnerId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TripBusPk = "tripId";
export type TripBusId = TripBus[TripBusPk];
export type TripBusOptionalAttributes = "createdAt" | "updatedAt";
export type TripBusCreationAttributes = Optional<TripBusAttributes, TripBusOptionalAttributes>;

export class TripBus extends Model<TripBusAttributes, TripBusCreationAttributes> implements TripBusAttributes {
  tripId!: number;
  busTypeId!: number;
  busId!: number;
  agentId!: number;
  partnerId!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TripBus belongsTo AppBus via partnerId
  partner!: AppBus;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppBus>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppBus, AppBusId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppBus>;
  // TripBus belongsTo AppBus via busId
  bus!: AppBus;
  getBus!: Sequelize.BelongsToGetAssociationMixin<AppBus>;
  setBus!: Sequelize.BelongsToSetAssociationMixin<AppBus, AppBusId>;
  createBus!: Sequelize.BelongsToCreateAssociationMixin<AppBus>;
  // TripBus belongsTo AppTrip via tripId
  trip!: AppTrip;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;
  // TripBus belongsTo AppTrip via agentId
  agent!: AppTrip;
  getAgent!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setAgent!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createAgent!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;
  // TripBus belongsTo AppTrip via busTypeId
  busType!: AppTrip;
  getBusType!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setBusType!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createBusType!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TripBus {
    return sequelize.define('TripBus', {
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_trips',
        key: 'trip_id'
      },
      field: 'trip_id'
    },
    busTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_trips',
        key: 'bus_type_id'
      },
      field: 'bus_type_id'
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_buses',
        key: 'bus_id'
      },
      field: 'bus_id'
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_trips',
        key: 'agent_id'
      },
      field: 'agent_id'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_buses',
        key: 'partner_id'
      },
      field: 'partner_id'
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
    tableName: 'trip_bus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
        ]
      },
      {
        name: "partner_id",
        using: "BTREE",
        fields: [
          { name: "partner_id" },
          { name: "agent_id" },
        ]
      },
      {
        name: "bus_id",
        using: "BTREE",
        fields: [
          { name: "bus_id" },
          { name: "partner_id" },
          { name: "bus_type_id" },
        ]
      },
      {
        name: "trip_id",
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "bus_type_id" },
          { name: "agent_id" },
        ]
      },
    ]
  }) as typeof TripBus;
  }
}
