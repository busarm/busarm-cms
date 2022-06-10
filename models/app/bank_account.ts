import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CountryBankAccount, CountryBankAccountId } from './country_bank_account';
import type { PartnerBankAccount, PartnerBankAccountId } from './partner_bank_account';
import type { UserBankAccount, UserBankAccountId } from './user_bank_account';

export interface BankAccountAttributes {
  accountId: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type BankAccountPk = "accountId";
export type BankAccountId = BankAccount[BankAccountPk];
export type BankAccountOptionalAttributes = "accountId" | "bankCode" | "createdAt" | "updatedAt";
export type BankAccountCreationAttributes = Optional<BankAccountAttributes, BankAccountOptionalAttributes>;

export class BankAccount extends Model<BankAccountAttributes, BankAccountCreationAttributes> implements BankAccountAttributes {
  accountId!: number;
  accountName!: string;
  accountNumber!: string;
  bankName!: string;
  bankCode?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // BankAccount hasMany CountryBankAccount via accountId
  countryBankAccounts!: CountryBankAccount[];
  getCountryBankAccounts!: Sequelize.HasManyGetAssociationsMixin<CountryBankAccount>;
  setCountryBankAccounts!: Sequelize.HasManySetAssociationsMixin<CountryBankAccount, CountryBankAccountId>;
  addCountryBankAccount!: Sequelize.HasManyAddAssociationMixin<CountryBankAccount, CountryBankAccountId>;
  addCountryBankAccounts!: Sequelize.HasManyAddAssociationsMixin<CountryBankAccount, CountryBankAccountId>;
  createCountryBankAccount!: Sequelize.HasManyCreateAssociationMixin<CountryBankAccount>;
  removeCountryBankAccount!: Sequelize.HasManyRemoveAssociationMixin<CountryBankAccount, CountryBankAccountId>;
  removeCountryBankAccounts!: Sequelize.HasManyRemoveAssociationsMixin<CountryBankAccount, CountryBankAccountId>;
  hasCountryBankAccount!: Sequelize.HasManyHasAssociationMixin<CountryBankAccount, CountryBankAccountId>;
  hasCountryBankAccounts!: Sequelize.HasManyHasAssociationsMixin<CountryBankAccount, CountryBankAccountId>;
  countCountryBankAccounts!: Sequelize.HasManyCountAssociationsMixin;
  // BankAccount hasMany PartnerBankAccount via accountId
  partnerBankAccounts!: PartnerBankAccount[];
  getPartnerBankAccounts!: Sequelize.HasManyGetAssociationsMixin<PartnerBankAccount>;
  setPartnerBankAccounts!: Sequelize.HasManySetAssociationsMixin<PartnerBankAccount, PartnerBankAccountId>;
  addPartnerBankAccount!: Sequelize.HasManyAddAssociationMixin<PartnerBankAccount, PartnerBankAccountId>;
  addPartnerBankAccounts!: Sequelize.HasManyAddAssociationsMixin<PartnerBankAccount, PartnerBankAccountId>;
  createPartnerBankAccount!: Sequelize.HasManyCreateAssociationMixin<PartnerBankAccount>;
  removePartnerBankAccount!: Sequelize.HasManyRemoveAssociationMixin<PartnerBankAccount, PartnerBankAccountId>;
  removePartnerBankAccounts!: Sequelize.HasManyRemoveAssociationsMixin<PartnerBankAccount, PartnerBankAccountId>;
  hasPartnerBankAccount!: Sequelize.HasManyHasAssociationMixin<PartnerBankAccount, PartnerBankAccountId>;
  hasPartnerBankAccounts!: Sequelize.HasManyHasAssociationsMixin<PartnerBankAccount, PartnerBankAccountId>;
  countPartnerBankAccounts!: Sequelize.HasManyCountAssociationsMixin;
  // BankAccount hasMany UserBankAccount via accountId
  userBankAccounts!: UserBankAccount[];
  getUserBankAccounts!: Sequelize.HasManyGetAssociationsMixin<UserBankAccount>;
  setUserBankAccounts!: Sequelize.HasManySetAssociationsMixin<UserBankAccount, UserBankAccountId>;
  addUserBankAccount!: Sequelize.HasManyAddAssociationMixin<UserBankAccount, UserBankAccountId>;
  addUserBankAccounts!: Sequelize.HasManyAddAssociationsMixin<UserBankAccount, UserBankAccountId>;
  createUserBankAccount!: Sequelize.HasManyCreateAssociationMixin<UserBankAccount>;
  removeUserBankAccount!: Sequelize.HasManyRemoveAssociationMixin<UserBankAccount, UserBankAccountId>;
  removeUserBankAccounts!: Sequelize.HasManyRemoveAssociationsMixin<UserBankAccount, UserBankAccountId>;
  hasUserBankAccount!: Sequelize.HasManyHasAssociationMixin<UserBankAccount, UserBankAccountId>;
  hasUserBankAccounts!: Sequelize.HasManyHasAssociationsMixin<UserBankAccount, UserBankAccountId>;
  countUserBankAccounts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof BankAccount {
    return sequelize.define('BankAccount', {
    accountId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'account_id'
    },
    accountName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'account_name'
    },
    accountNumber: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'account_number'
    },
    bankName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'bank_name'
    },
    bankCode: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'bank_code'
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
    tableName: 'bank_accounts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
    ]
  }) as typeof BankAccount;
  }
}
