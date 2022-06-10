import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCity, AppCityId } from './app_city';
import type { AppTrip, AppTripId } from './app_trip';
import type { LocationType, LocationTypeId } from './location_type';
import type { PartnerBranch, PartnerBranchId } from './partner_branch';
import type { PartnerLocation, PartnerLocationId } from './partner_location';

export interface AppLocationAttributes {
  locId: number;
  cityId: number;
  locName: string;
  locAddress: string;
  lat: number;
  lng: number;
  typeId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppLocationPk = "locId";
export type AppLocationId = AppLocation[AppLocationPk];
export type AppLocationOptionalAttributes = "locId" | "createdAt" | "updatedAt";
export type AppLocationCreationAttributes = Optional<AppLocationAttributes, AppLocationOptionalAttributes>;

export class AppLocation extends Model<AppLocationAttributes, AppLocationCreationAttributes> implements AppLocationAttributes {
  locId!: number;
  cityId!: number;
  locName!: string;
  locAddress!: string;
  lat!: number;
  lng!: number;
  typeId!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppLocation belongsTo AppCity via cityId
  city!: AppCity;
  getCity!: Sequelize.BelongsToGetAssociationMixin<AppCity>;
  setCity!: Sequelize.BelongsToSetAssociationMixin<AppCity, AppCityId>;
  createCity!: Sequelize.BelongsToCreateAssociationMixin<AppCity>;
  // AppLocation hasMany AppTrip via dropoffLocId
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
  // AppLocation hasMany AppTrip via pickupLocId
  pickupLocAppTrips!: AppTrip[];
  getPickupLocAppTrips!: Sequelize.HasManyGetAssociationsMixin<AppTrip>;
  setPickupLocAppTrips!: Sequelize.HasManySetAssociationsMixin<AppTrip, AppTripId>;
  addPickupLocAppTrip!: Sequelize.HasManyAddAssociationMixin<AppTrip, AppTripId>;
  addPickupLocAppTrips!: Sequelize.HasManyAddAssociationsMixin<AppTrip, AppTripId>;
  createPickupLocAppTrip!: Sequelize.HasManyCreateAssociationMixin<AppTrip>;
  removePickupLocAppTrip!: Sequelize.HasManyRemoveAssociationMixin<AppTrip, AppTripId>;
  removePickupLocAppTrips!: Sequelize.HasManyRemoveAssociationsMixin<AppTrip, AppTripId>;
  hasPickupLocAppTrip!: Sequelize.HasManyHasAssociationMixin<AppTrip, AppTripId>;
  hasPickupLocAppTrips!: Sequelize.HasManyHasAssociationsMixin<AppTrip, AppTripId>;
  countPickupLocAppTrips!: Sequelize.HasManyCountAssociationsMixin;
  // AppLocation hasMany PartnerBranch via locId
  partnerBranches!: PartnerBranch[];
  getPartnerBranches!: Sequelize.HasManyGetAssociationsMixin<PartnerBranch>;
  setPartnerBranches!: Sequelize.HasManySetAssociationsMixin<PartnerBranch, PartnerBranchId>;
  addPartnerBranch!: Sequelize.HasManyAddAssociationMixin<PartnerBranch, PartnerBranchId>;
  addPartnerBranches!: Sequelize.HasManyAddAssociationsMixin<PartnerBranch, PartnerBranchId>;
  createPartnerBranch!: Sequelize.HasManyCreateAssociationMixin<PartnerBranch>;
  removePartnerBranch!: Sequelize.HasManyRemoveAssociationMixin<PartnerBranch, PartnerBranchId>;
  removePartnerBranches!: Sequelize.HasManyRemoveAssociationsMixin<PartnerBranch, PartnerBranchId>;
  hasPartnerBranch!: Sequelize.HasManyHasAssociationMixin<PartnerBranch, PartnerBranchId>;
  hasPartnerBranches!: Sequelize.HasManyHasAssociationsMixin<PartnerBranch, PartnerBranchId>;
  countPartnerBranches!: Sequelize.HasManyCountAssociationsMixin;
  // AppLocation hasMany PartnerLocation via locId
  partnerLocations!: PartnerLocation[];
  getPartnerLocations!: Sequelize.HasManyGetAssociationsMixin<PartnerLocation>;
  setPartnerLocations!: Sequelize.HasManySetAssociationsMixin<PartnerLocation, PartnerLocationId>;
  addPartnerLocation!: Sequelize.HasManyAddAssociationMixin<PartnerLocation, PartnerLocationId>;
  addPartnerLocations!: Sequelize.HasManyAddAssociationsMixin<PartnerLocation, PartnerLocationId>;
  createPartnerLocation!: Sequelize.HasManyCreateAssociationMixin<PartnerLocation>;
  removePartnerLocation!: Sequelize.HasManyRemoveAssociationMixin<PartnerLocation, PartnerLocationId>;
  removePartnerLocations!: Sequelize.HasManyRemoveAssociationsMixin<PartnerLocation, PartnerLocationId>;
  hasPartnerLocation!: Sequelize.HasManyHasAssociationMixin<PartnerLocation, PartnerLocationId>;
  hasPartnerLocations!: Sequelize.HasManyHasAssociationsMixin<PartnerLocation, PartnerLocationId>;
  countPartnerLocations!: Sequelize.HasManyCountAssociationsMixin;
  // AppLocation belongsTo LocationType via typeId
  type!: LocationType;
  getType!: Sequelize.BelongsToGetAssociationMixin<LocationType>;
  setType!: Sequelize.BelongsToSetAssociationMixin<LocationType, LocationTypeId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<LocationType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppLocation {
    return sequelize.define('AppLocation', {
    locId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'loc_id'
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_cities',
        key: 'city_id'
      },
      field: 'city_id'
    },
    locName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'loc_name'
    },
    locAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'loc_address'
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'location_types',
        key: 'type_id'
      },
      field: 'type_id'
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
    tableName: 'app_locations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "loc_id" },
        ]
      },
      {
        name: "city_id",
        using: "BTREE",
        fields: [
          { name: "city_id" },
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
        name: "loc_name",
        type: "FULLTEXT",
        fields: [
          { name: "loc_name" },
        ]
      },
    ]
  }) as typeof AppLocation;
  }
}
