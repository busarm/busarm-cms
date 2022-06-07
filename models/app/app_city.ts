import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppProvince, AppProvinceId } from './app_province';

export interface AppCityAttributes {
  cityId: number;
  cityName: string;
  provCode: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppCityPk = "cityId";
export type AppCityId = AppCity[AppCityPk];
export type AppCityOptionalAttributes = "cityId" | "createdAt" | "updatedAt";
export type AppCityCreationAttributes = Optional<AppCityAttributes, AppCityOptionalAttributes>;

export class AppCity extends Model<AppCityAttributes, AppCityCreationAttributes> implements AppCityAttributes {
  cityId!: number;
  cityName!: string;
  provCode!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppCity hasMany AppLocation via cityId
  appLocations!: AppLocation[];
  getAppLocations!: Sequelize.HasManyGetAssociationsMixin<AppLocation>;
  setAppLocations!: Sequelize.HasManySetAssociationsMixin<AppLocation, AppLocationId>;
  addAppLocation!: Sequelize.HasManyAddAssociationMixin<AppLocation, AppLocationId>;
  addAppLocations!: Sequelize.HasManyAddAssociationsMixin<AppLocation, AppLocationId>;
  createAppLocation!: Sequelize.HasManyCreateAssociationMixin<AppLocation>;
  removeAppLocation!: Sequelize.HasManyRemoveAssociationMixin<AppLocation, AppLocationId>;
  removeAppLocations!: Sequelize.HasManyRemoveAssociationsMixin<AppLocation, AppLocationId>;
  hasAppLocation!: Sequelize.HasManyHasAssociationMixin<AppLocation, AppLocationId>;
  hasAppLocations!: Sequelize.HasManyHasAssociationsMixin<AppLocation, AppLocationId>;
  countAppLocations!: Sequelize.HasManyCountAssociationsMixin;
  // AppCity belongsTo AppProvince via provCode
  provCodeAppProvince!: AppProvince;
  getProvCodeAppProvince!: Sequelize.BelongsToGetAssociationMixin<AppProvince>;
  setProvCodeAppProvince!: Sequelize.BelongsToSetAssociationMixin<AppProvince, AppProvinceId>;
  createProvCodeAppProvince!: Sequelize.BelongsToCreateAssociationMixin<AppProvince>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppCity {
    return sequelize.define('AppCity', {
    cityId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'city_id'
    },
    cityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'city_name'
    },
    provCode: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      references: {
        model: 'app_provinces',
        key: 'prov_code'
      },
      field: 'prov_code'
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
    tableName: 'app_cities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "city_id" },
        ]
      },
      {
        name: "prov_code",
        using: "BTREE",
        fields: [
          { name: "prov_code" },
        ]
      },
      {
        name: "city_name",
        type: "FULLTEXT",
        fields: [
          { name: "city_name" },
        ]
      },
    ]
  }) as typeof AppCity;
  }
}
