import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppTransaction, AppTransactionId } from './app_transaction';
import type { CountryPaymentMethod, CountryPaymentMethodId } from './country_payment_method';

export interface AppPaymentMethodAttributes {
  methodId: number;
  methodName: string;
  methodValue?: string;
  usePayment: number;
  useTransfer?: number;
  isDefault: number;
  provider?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppPaymentMethodPk = "methodId";
export type AppPaymentMethodId = AppPaymentMethod[AppPaymentMethodPk];
export type AppPaymentMethodOptionalAttributes = "methodId" | "methodValue" | "useTransfer" | "provider" | "createdAt" | "updatedAt";
export type AppPaymentMethodCreationAttributes = Optional<AppPaymentMethodAttributes, AppPaymentMethodOptionalAttributes>;

export class AppPaymentMethod extends Model<AppPaymentMethodAttributes, AppPaymentMethodCreationAttributes> implements AppPaymentMethodAttributes {
  methodId!: number;
  methodName!: string;
  methodValue?: string;
  usePayment!: number;
  useTransfer?: number;
  isDefault!: number;
  provider?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppPaymentMethod hasMany AppTransaction via transactionMethod
  appTransactions!: AppTransaction[];
  getAppTransactions!: Sequelize.HasManyGetAssociationsMixin<AppTransaction>;
  setAppTransactions!: Sequelize.HasManySetAssociationsMixin<AppTransaction, AppTransactionId>;
  addAppTransaction!: Sequelize.HasManyAddAssociationMixin<AppTransaction, AppTransactionId>;
  addAppTransactions!: Sequelize.HasManyAddAssociationsMixin<AppTransaction, AppTransactionId>;
  createAppTransaction!: Sequelize.HasManyCreateAssociationMixin<AppTransaction>;
  removeAppTransaction!: Sequelize.HasManyRemoveAssociationMixin<AppTransaction, AppTransactionId>;
  removeAppTransactions!: Sequelize.HasManyRemoveAssociationsMixin<AppTransaction, AppTransactionId>;
  hasAppTransaction!: Sequelize.HasManyHasAssociationMixin<AppTransaction, AppTransactionId>;
  hasAppTransactions!: Sequelize.HasManyHasAssociationsMixin<AppTransaction, AppTransactionId>;
  countAppTransactions!: Sequelize.HasManyCountAssociationsMixin;
  // AppPaymentMethod hasMany CountryPaymentMethod via methodId
  countryPaymentMethods!: CountryPaymentMethod[];
  getCountryPaymentMethods!: Sequelize.HasManyGetAssociationsMixin<CountryPaymentMethod>;
  setCountryPaymentMethods!: Sequelize.HasManySetAssociationsMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  addCountryPaymentMethod!: Sequelize.HasManyAddAssociationMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  addCountryPaymentMethods!: Sequelize.HasManyAddAssociationsMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  createCountryPaymentMethod!: Sequelize.HasManyCreateAssociationMixin<CountryPaymentMethod>;
  removeCountryPaymentMethod!: Sequelize.HasManyRemoveAssociationMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  removeCountryPaymentMethods!: Sequelize.HasManyRemoveAssociationsMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  hasCountryPaymentMethod!: Sequelize.HasManyHasAssociationMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  hasCountryPaymentMethods!: Sequelize.HasManyHasAssociationsMixin<CountryPaymentMethod, CountryPaymentMethodId>;
  countCountryPaymentMethods!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppPaymentMethod {
    return sequelize.define('AppPaymentMethod', {
    methodId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'method_id'
    },
    methodName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'method_name'
    },
    methodValue: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'method_value'
    },
    usePayment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'use_payment'
    },
    useTransfer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'use_transfer'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_default'
    },
    provider: {
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
    tableName: 'app_payment_methods',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "method_id" },
        ]
      },
    ]
  }) as typeof AppPaymentMethod;
  }
}
