import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppPartner, AppPartnerId } from './app_partner';
import type { AppText, AppTextId } from './app_text';
import type { BusImage, BusImageId } from './bus_image';
import type { BusType, BusTypeId } from './bus_type';
import type { PartnerSharedBus, PartnerSharedBusId } from './partner_shared_bus';

export interface AppBusAttributes {
  busId: number;
  busPlateNum?: string;
  typeId: number;
  busDescTextId?: number;
  partnerId: number;
  countryCode: string;
  seats?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppBusPk = "busId";
export type AppBusId = AppBus[AppBusPk];
export type AppBusOptionalAttributes = "busId" | "busPlateNum" | "busDescTextId" | "seats" | "createdAt" | "updatedAt";
export type AppBusCreationAttributes = Optional<AppBusAttributes, AppBusOptionalAttributes>;

export class AppBus extends Model<AppBusAttributes, AppBusCreationAttributes> implements AppBusAttributes {
  busId!: number;
  busPlateNum?: string;
  typeId!: number;
  busDescTextId?: number;
  partnerId!: number;
  countryCode!: string;
  seats?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppBus belongsToMany AppPartner via busId and partnerId
  partnerIdAppPartnersPartnerSharedBuses!: AppPartner[];
  getPartnerIdAppPartnersPartnerSharedBuses!: Sequelize.BelongsToManyGetAssociationsMixin<AppPartner>;
  setPartnerIdAppPartnersPartnerSharedBuses!: Sequelize.BelongsToManySetAssociationsMixin<AppPartner, AppPartnerId>;
  addPartnerIdAppPartnersPartnerSharedBus!: Sequelize.BelongsToManyAddAssociationMixin<AppPartner, AppPartnerId>;
  addPartnerIdAppPartnersPartnerSharedBuses!: Sequelize.BelongsToManyAddAssociationsMixin<AppPartner, AppPartnerId>;
  createPartnerIdAppPartnersPartnerSharedBus!: Sequelize.BelongsToManyCreateAssociationMixin<AppPartner>;
  removePartnerIdAppPartnersPartnerSharedBus!: Sequelize.BelongsToManyRemoveAssociationMixin<AppPartner, AppPartnerId>;
  removePartnerIdAppPartnersPartnerSharedBuses!: Sequelize.BelongsToManyRemoveAssociationsMixin<AppPartner, AppPartnerId>;
  hasPartnerIdAppPartnersPartnerSharedBus!: Sequelize.BelongsToManyHasAssociationMixin<AppPartner, AppPartnerId>;
  hasPartnerIdAppPartnersPartnerSharedBuses!: Sequelize.BelongsToManyHasAssociationsMixin<AppPartner, AppPartnerId>;
  countPartnerIdAppPartnersPartnerSharedBuses!: Sequelize.BelongsToManyCountAssociationsMixin;
  // AppBus hasMany BusImage via busId
  busImages!: BusImage[];
  getBusImages!: Sequelize.HasManyGetAssociationsMixin<BusImage>;
  setBusImages!: Sequelize.HasManySetAssociationsMixin<BusImage, BusImageId>;
  addBusImage!: Sequelize.HasManyAddAssociationMixin<BusImage, BusImageId>;
  addBusImages!: Sequelize.HasManyAddAssociationsMixin<BusImage, BusImageId>;
  createBusImage!: Sequelize.HasManyCreateAssociationMixin<BusImage>;
  removeBusImage!: Sequelize.HasManyRemoveAssociationMixin<BusImage, BusImageId>;
  removeBusImages!: Sequelize.HasManyRemoveAssociationsMixin<BusImage, BusImageId>;
  hasBusImage!: Sequelize.HasManyHasAssociationMixin<BusImage, BusImageId>;
  hasBusImages!: Sequelize.HasManyHasAssociationsMixin<BusImage, BusImageId>;
  countBusImages!: Sequelize.HasManyCountAssociationsMixin;
  // AppBus hasMany PartnerSharedBus via busId
  partnerSharedBuses!: PartnerSharedBus[];
  getPartnerSharedBuses!: Sequelize.HasManyGetAssociationsMixin<PartnerSharedBus>;
  setPartnerSharedBuses!: Sequelize.HasManySetAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  addPartnerSharedBus!: Sequelize.HasManyAddAssociationMixin<PartnerSharedBus, PartnerSharedBusId>;
  addPartnerSharedBuses!: Sequelize.HasManyAddAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  createPartnerSharedBus!: Sequelize.HasManyCreateAssociationMixin<PartnerSharedBus>;
  removePartnerSharedBus!: Sequelize.HasManyRemoveAssociationMixin<PartnerSharedBus, PartnerSharedBusId>;
  removePartnerSharedBuses!: Sequelize.HasManyRemoveAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  hasPartnerSharedBus!: Sequelize.HasManyHasAssociationMixin<PartnerSharedBus, PartnerSharedBusId>;
  hasPartnerSharedBuses!: Sequelize.HasManyHasAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  countPartnerSharedBuses!: Sequelize.HasManyCountAssociationsMixin;
  // AppBus belongsTo AppCountry via countryCode
  countryCodeAppCountry!: AppCountry;
  getCountryCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCountryCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCountryCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // AppBus belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;
  // AppBus belongsTo AppText via busDescTextId
  busDescText!: AppText;
  getBusDescText!: Sequelize.BelongsToGetAssociationMixin<AppText>;
  setBusDescText!: Sequelize.BelongsToSetAssociationMixin<AppText, AppTextId>;
  createBusDescText!: Sequelize.BelongsToCreateAssociationMixin<AppText>;
  // AppBus belongsTo BusType via typeId
  type!: BusType;
  getType!: Sequelize.BelongsToGetAssociationMixin<BusType>;
  setType!: Sequelize.BelongsToSetAssociationMixin<BusType, BusTypeId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<BusType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppBus {
    return sequelize.define('AppBus', {
    busId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'bus_id'
    },
    busPlateNum: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "bus_plate_num",
      field: 'bus_plate_num'
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bus_types',
        key: 'type_id'
      },
      field: 'type_id'
    },
    busDescTextId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_texts',
        key: 'text_id'
      },
      field: 'bus_desc_text_id'
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
    countryCode: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      references: {
        model: 'app_countries',
        key: 'country_code'
      },
      field: 'country_code'
    },
    seats: {
      type: DataTypes.INTEGER,
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
    tableName: 'app_buses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bus_id" },
        ]
      },
      {
        name: "bus_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bus_id" },
          { name: "partner_id" },
        ]
      },
      {
        name: "bus_plate_num",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bus_plate_num" },
        ]
      },
      {
        name: "country_code",
        using: "BTREE",
        fields: [
          { name: "country_code" },
        ]
      },
      {
        name: "partner_id",
        using: "BTREE",
        fields: [
          { name: "partner_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "bus_desc_text_id",
        using: "BTREE",
        fields: [
          { name: "bus_desc_text_id" },
        ]
      },
    ]
  }) as typeof AppBus;
  }
}
