import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBus, AppBusId } from './app_bus';
import type { AppPartner, AppPartnerId } from './app_partner';

export interface PartnerSharedBusAttributes {
  id: number;
  partnerId: number;
  busId: number;
  title?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartnerSharedBusPk = "id";
export type PartnerSharedBusId = PartnerSharedBus[PartnerSharedBusPk];
export type PartnerSharedBusOptionalAttributes = "id" | "title" | "createdAt" | "updatedAt";
export type PartnerSharedBusCreationAttributes = Optional<PartnerSharedBusAttributes, PartnerSharedBusOptionalAttributes>;

export class PartnerSharedBus extends Model<PartnerSharedBusAttributes, PartnerSharedBusCreationAttributes> implements PartnerSharedBusAttributes {
  id!: number;
  partnerId!: number;
  busId!: number;
  title?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // PartnerSharedBus belongsTo AppBus via busId
  bus!: AppBus;
  getBus!: Sequelize.BelongsToGetAssociationMixin<AppBus>;
  setBus!: Sequelize.BelongsToSetAssociationMixin<AppBus, AppBusId>;
  createBus!: Sequelize.BelongsToCreateAssociationMixin<AppBus>;
  // PartnerSharedBus belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PartnerSharedBus {
    return sequelize.define('PartnerSharedBus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_buses',
        key: 'bus_id'
      },
      field: 'bus_id'
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
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
    tableName: 'partner_shared_buses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "partner_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "partner_id" },
          { name: "bus_id" },
        ]
      },
      {
        name: "bus_id",
        using: "BTREE",
        fields: [
          { name: "bus_id" },
        ]
      },
    ]
  }) as typeof PartnerSharedBus;
  }
}
