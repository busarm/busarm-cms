import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppPartner, AppPartnerId } from './app_partner';

export interface PartnerLocationAttributes {
  id: number;
  partnerId: number;
  locId: number;
  isActive?: number;
  isDefault?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartnerLocationPk = "id";
export type PartnerLocationId = PartnerLocation[PartnerLocationPk];
export type PartnerLocationOptionalAttributes = "id" | "isActive" | "isDefault" | "createdAt" | "updatedAt";
export type PartnerLocationCreationAttributes = Optional<PartnerLocationAttributes, PartnerLocationOptionalAttributes>;

export class PartnerLocation extends Model<PartnerLocationAttributes, PartnerLocationCreationAttributes> implements PartnerLocationAttributes {
  id!: number;
  partnerId!: number;
  locId!: number;
  isActive?: number;
  isDefault?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // PartnerLocation belongsTo AppLocation via locId
  loc!: AppLocation;
  getLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // PartnerLocation belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PartnerLocation {
    return sequelize.define('PartnerLocation', {
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
    locId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'loc_id'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      field: 'is_active'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'is_default'
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
    tableName: 'partner_locations',
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
          { name: "loc_id" },
        ]
      },
      {
        name: "loc_id",
        using: "BTREE",
        fields: [
          { name: "loc_id" },
        ]
      },
    ]
  }) as typeof PartnerLocation;
  }
}
