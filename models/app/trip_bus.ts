import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppAgent, AppAgentId } from './app_agent';
import type { AppBus, AppBusId } from './app_bus';
import type { AppPartner, AppPartnerId } from './app_partner';
import type { AppTrip, AppTripId } from './app_trip';
import type { BusType, BusTypeId } from './bus_type';

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

  // TripBus belongsTo AppAgent via agentId
  agent!: AppAgent;
  getAgent!: Sequelize.BelongsToGetAssociationMixin<AppAgent>;
  setAgent!: Sequelize.BelongsToSetAssociationMixin<AppAgent, AppAgentId>;
  createAgent!: Sequelize.BelongsToCreateAssociationMixin<AppAgent>;
  // TripBus belongsTo AppBus via busId
  bus!: AppBus;
  getBus!: Sequelize.BelongsToGetAssociationMixin<AppBus>;
  setBus!: Sequelize.BelongsToSetAssociationMixin<AppBus, AppBusId>;
  createBus!: Sequelize.BelongsToCreateAssociationMixin<AppBus>;
  // TripBus belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;
  // TripBus belongsTo AppTrip via tripId
  trip!: AppTrip;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;
  // TripBus belongsTo BusType via busTypeId
  busType!: BusType;
  getBusType!: Sequelize.BelongsToGetAssociationMixin<BusType>;
  setBusType!: Sequelize.BelongsToSetAssociationMixin<BusType, BusTypeId>;
  createBusType!: Sequelize.BelongsToCreateAssociationMixin<BusType>;

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
        model: 'bus_types',
        key: 'type_id'
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
        model: 'app_agents',
        key: 'agent_id'
      },
      field: 'agent_id'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_partners',
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
      {
        name: "agent_id",
        using: "BTREE",
        fields: [
          { name: "agent_id" },
        ]
      },
      {
        name: "bus_type_id",
        using: "BTREE",
        fields: [
          { name: "bus_type_id" },
        ]
      },
    ]
  }) as typeof TripBus;
  }
}
