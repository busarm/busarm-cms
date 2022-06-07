import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { BankAccount, BankAccountId } from './bank_account';

export interface CountryBankAccountAttributes {
  countryCode: string;
  accountId: number;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type CountryBankAccountPk = "countryCode" | "accountId";
export type CountryBankAccountId = CountryBankAccount[CountryBankAccountPk];
export type CountryBankAccountOptionalAttributes = "isActive" | "createdAt" | "updatedAt";
export type CountryBankAccountCreationAttributes = Optional<CountryBankAccountAttributes, CountryBankAccountOptionalAttributes>;

export class CountryBankAccount extends Model<CountryBankAccountAttributes, CountryBankAccountCreationAttributes> implements CountryBankAccountAttributes {
  countryCode!: string;
  accountId!: number;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // CountryBankAccount belongsTo AppCountry via countryCode
  countryCodeAppCountry!: AppCountry;
  getCountryCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCountryCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCountryCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // CountryBankAccount belongsTo BankAccount via accountId
  account!: BankAccount;
  getAccount!: Sequelize.BelongsToGetAssociationMixin<BankAccount>;
  setAccount!: Sequelize.BelongsToSetAssociationMixin<BankAccount, BankAccountId>;
  createAccount!: Sequelize.BelongsToCreateAssociationMixin<BankAccount>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CountryBankAccount {
    return sequelize.define('CountryBankAccount', {
    countryCode: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_countries',
        key: 'country_code'
      },
      field: 'country_code'
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bank_accounts',
        key: 'account_id'
      },
      field: 'account_id'
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
    tableName: 'country_bank_account',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_code" },
          { name: "account_id" },
        ]
      },
      {
        name: "account_id",
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
      {
        name: "country_code",
        using: "BTREE",
        fields: [
          { name: "country_code" },
        ]
      },
    ]
  }) as typeof CountryBankAccount;
  }
}
