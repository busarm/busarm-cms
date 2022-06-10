import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppPaymentMethod, AppPaymentMethodId } from './app_payment_method';

export interface CountryPaymentMethodAttributes {
  id: number;
  countryCode: string;
  methodId: number;
  fees?: number;
  feesPercent?: number;
  transferFee?: number;
  transferFeePercent?: number;
  transferMinimum?: number;
  transferType?: string;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type CountryPaymentMethodPk = "id";
export type CountryPaymentMethodId = CountryPaymentMethod[CountryPaymentMethodPk];
export type CountryPaymentMethodOptionalAttributes = "id" | "fees" | "feesPercent" | "transferFee" | "transferFeePercent" | "transferMinimum" | "transferType" | "isActive" | "createdAt" | "updatedAt";
export type CountryPaymentMethodCreationAttributes = Optional<CountryPaymentMethodAttributes, CountryPaymentMethodOptionalAttributes>;

export class CountryPaymentMethod extends Model<CountryPaymentMethodAttributes, CountryPaymentMethodCreationAttributes> implements CountryPaymentMethodAttributes {
  id!: number;
  countryCode!: string;
  methodId!: number;
  fees?: number;
  feesPercent?: number;
  transferFee?: number;
  transferFeePercent?: number;
  transferMinimum?: number;
  transferType?: string;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // CountryPaymentMethod belongsTo AppCountry via countryCode
  countryCodeAppCountry!: AppCountry;
  getCountryCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCountryCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCountryCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // CountryPaymentMethod belongsTo AppPaymentMethod via methodId
  method!: AppPaymentMethod;
  getMethod!: Sequelize.BelongsToGetAssociationMixin<AppPaymentMethod>;
  setMethod!: Sequelize.BelongsToSetAssociationMixin<AppPaymentMethod, AppPaymentMethodId>;
  createMethod!: Sequelize.BelongsToCreateAssociationMixin<AppPaymentMethod>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CountryPaymentMethod {
    return sequelize.define('CountryPaymentMethod', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    methodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_payment_methods',
        key: 'method_id'
      },
      field: 'method_id'
    },
    fees: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    feesPercent: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'fees_percent'
    },
    transferFee: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'transfer_fee'
    },
    transferFeePercent: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'transfer_fee_percent'
    },
    transferMinimum: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'transfer_minimum'
    },
    transferType: {
      type: DataTypes.STRING(16),
      allowNull: true,
      field: 'transfer_type'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      field: 'is_active'
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
    tableName: 'country_payment_method',
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
        name: "country_code_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_code" },
          { name: "method_id" },
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
        name: "method_id",
        using: "BTREE",
        fields: [
          { name: "method_id" },
        ]
      },
    ]
  }) as typeof CountryPaymentMethod;
  }
}
