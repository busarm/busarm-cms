import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppPartner, AppPartnerId } from './app_partner';
import type { AppText, AppTextId } from './app_text';
import type { BusImage, BusImageId } from './bus_image';
import type { BusType, BusTypeId } from './bus_type';
import type { PartnerSharedBus, PartnerSharedBusId } from './partner_shared_bus';
import type { TripBus, TripBusId } from './trip_bus';

export interface AppBusAttributes {
  busId: number;
  plateNumber?: string;
  typeId: number;
  descTextId?: number;
  partnerId: number;
  countryCode: string;
  seats?: number;
  hasAc?: number;
  hasCharger?: number;
  hasWifi?: number;
  hasLight?: number;
  hasBlanket?: number;
  hasFood?: number;
  hasWater?: number;
  hasTv?: number;
  hasToilet?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppBusPk = "busId";
export type AppBusId = AppBus[AppBusPk];
export type AppBusOptionalAttributes = "busId" | "plateNumber" | "descTextId" | "seats" | "hasAc" | "hasCharger" | "hasWifi" | "hasLight" | "hasBlanket" | "hasFood" | "hasWater" | "hasTv" | "hasToilet" | "createdAt" | "updatedAt";
export type AppBusCreationAttributes = Optional<AppBusAttributes, AppBusOptionalAttributes>;

export class AppBus extends Model<AppBusAttributes, AppBusCreationAttributes> implements AppBusAttributes {
  busId!: number;
  plateNumber?: string;
  typeId!: number;
  descTextId?: number;
  partnerId!: number;
  countryCode!: string;
  seats?: number;
  hasAc?: number;
  hasCharger?: number;
  hasWifi?: number;
  hasLight?: number;
  hasBlanket?: number;
  hasFood?: number;
  hasWater?: number;
  hasTv?: number;
  hasToilet?: number;
  createdAt!: Date;
  updatedAt?: Date;

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
  // AppBus hasMany TripBus via partnerId
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
  // AppBus hasMany TripBus via busId
  busTripBuses!: TripBus[];
  getBusTripBuses!: Sequelize.HasManyGetAssociationsMixin<TripBus>;
  setBusTripBuses!: Sequelize.HasManySetAssociationsMixin<TripBus, TripBusId>;
  addBusTripBus!: Sequelize.HasManyAddAssociationMixin<TripBus, TripBusId>;
  addBusTripBuses!: Sequelize.HasManyAddAssociationsMixin<TripBus, TripBusId>;
  createBusTripBus!: Sequelize.HasManyCreateAssociationMixin<TripBus>;
  removeBusTripBus!: Sequelize.HasManyRemoveAssociationMixin<TripBus, TripBusId>;
  removeBusTripBuses!: Sequelize.HasManyRemoveAssociationsMixin<TripBus, TripBusId>;
  hasBusTripBus!: Sequelize.HasManyHasAssociationMixin<TripBus, TripBusId>;
  hasBusTripBuses!: Sequelize.HasManyHasAssociationsMixin<TripBus, TripBusId>;
  countBusTripBuses!: Sequelize.HasManyCountAssociationsMixin;
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
  // AppBus belongsTo AppText via descTextId
  descText!: AppText;
  getDescText!: Sequelize.BelongsToGetAssociationMixin<AppText>;
  setDescText!: Sequelize.BelongsToSetAssociationMixin<AppText, AppTextId>;
  createDescText!: Sequelize.BelongsToCreateAssociationMixin<AppText>;
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
    plateNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "plate_number",
      field: 'plate_number'
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
    descTextId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_texts',
        key: 'text_id'
      },
      field: 'desc_text_id'
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
    hasAc: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_ac'
    },
    hasCharger: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_charger'
    },
    hasWifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_wifi'
    },
    hasLight: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_light'
    },
    hasBlanket: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_blanket'
    },
    hasFood: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_food'
    },
    hasWater: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_water'
    },
    hasTv: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_tv'
    },
    hasToilet: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'has_toilet'
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
        name: "plate_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "plate_number" },
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
        name: "desc_text_id",
        using: "BTREE",
        fields: [
          { name: "desc_text_id" },
        ]
      },
    ]
  }) as typeof AppBus;
  }
}
