import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCity, AppCityId } from './app_city';
import type { AppCountry, AppCountryId } from './app_country';

export interface AppProvinceAttributes {
  provCode: string;
  provName?: string;
  countryCode: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppProvincePk = "provCode";
export type AppProvinceId = AppProvince[AppProvincePk];
export type AppProvinceOptionalAttributes = "provName" | "createdAt" | "updatedAt";
export type AppProvinceCreationAttributes = Optional<AppProvinceAttributes, AppProvinceOptionalAttributes>;

export class AppProvince extends Model<AppProvinceAttributes, AppProvinceCreationAttributes> implements AppProvinceAttributes {
  provCode!: string;
  provName?: string;
  countryCode!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppProvince belongsTo AppCountry via countryCode
  countryCodeAppCountry!: AppCountry;
  getCountryCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCountryCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCountryCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // AppProvince hasMany AppCity via provCode
  appCities!: AppCity[];
  getAppCities!: Sequelize.HasManyGetAssociationsMixin<AppCity>;
  setAppCities!: Sequelize.HasManySetAssociationsMixin<AppCity, AppCityId>;
  addAppCity!: Sequelize.HasManyAddAssociationMixin<AppCity, AppCityId>;
  addAppCities!: Sequelize.HasManyAddAssociationsMixin<AppCity, AppCityId>;
  createAppCity!: Sequelize.HasManyCreateAssociationMixin<AppCity>;
  removeAppCity!: Sequelize.HasManyRemoveAssociationMixin<AppCity, AppCityId>;
  removeAppCities!: Sequelize.HasManyRemoveAssociationsMixin<AppCity, AppCityId>;
  hasAppCity!: Sequelize.HasManyHasAssociationMixin<AppCity, AppCityId>;
  hasAppCities!: Sequelize.HasManyHasAssociationsMixin<AppCity, AppCityId>;
  countAppCities!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppProvince {
    return sequelize.define('AppProvince', {
    provCode: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      field: 'prov_code'
    },
    provName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'prov_name'
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
    tableName: 'app_provinces',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prov_code" },
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
        name: "prov_name",
        type: "FULLTEXT",
        fields: [
          { name: "prov_name" },
        ]
      },
    ]
  }) as typeof AppProvince;
  }
}
