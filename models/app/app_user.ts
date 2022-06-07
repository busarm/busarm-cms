import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppAgent, AppAgentCreationAttributes, AppAgentId } from './app_agent';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppLanguage, AppLanguageId } from './app_language';
import type { AppPartner, AppPartnerCreationAttributes, AppPartnerId } from './app_partner';
import type { AppTransaction, AppTransactionId } from './app_transaction';
import type { TransactionPayinRequest, TransactionPayinRequestId } from './transaction_payin_request';
import type { TransactionPayoutRequest, TransactionPayoutRequestId } from './transaction_payout_request';
import type { UserBankAccount, UserBankAccountCreationAttributes, UserBankAccountId } from './user_bank_account';

export interface AppUserAttributes {
  userId: string;
  userAuthId?: string;
  userEmail?: string;
  userName?: string;
  userDialCode?: string;
  userPhone?: string;
  userLangCode: string;
  credentialsUpdated: number;
  verified: number;
  suspended: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppUserPk = "userId";
export type AppUserId = AppUser[AppUserPk];
export type AppUserOptionalAttributes = "userAuthId" | "userEmail" | "userName" | "userDialCode" | "userPhone" | "userLangCode" | "credentialsUpdated" | "verified" | "suspended" | "createdAt" | "updatedAt";
export type AppUserCreationAttributes = Optional<AppUserAttributes, AppUserOptionalAttributes>;

export class AppUser extends Model<AppUserAttributes, AppUserCreationAttributes> implements AppUserAttributes {
  userId!: string;
  userAuthId?: string;
  userEmail?: string;
  userName?: string;
  userDialCode?: string;
  userPhone?: string;
  userLangCode!: string;
  credentialsUpdated!: number;
  verified!: number;
  suspended!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppUser belongsTo AppCountry via userDialCode
  userDialCodeAppCountry!: AppCountry;
  getUserDialCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setUserDialCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createUserDialCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // AppUser belongsTo AppLanguage via userLangCode
  userLangCodeAppLanguage!: AppLanguage;
  getUserLangCodeAppLanguage!: Sequelize.BelongsToGetAssociationMixin<AppLanguage>;
  setUserLangCodeAppLanguage!: Sequelize.BelongsToSetAssociationMixin<AppLanguage, AppLanguageId>;
  createUserLangCodeAppLanguage!: Sequelize.BelongsToCreateAssociationMixin<AppLanguage>;
  // AppUser hasOne AppAgent via userId
  appAgent!: AppAgent;
  getAppAgent!: Sequelize.HasOneGetAssociationMixin<AppAgent>;
  setAppAgent!: Sequelize.HasOneSetAssociationMixin<AppAgent, AppAgentId>;
  createAppAgent!: Sequelize.HasOneCreateAssociationMixin<AppAgent>;
  // AppUser hasMany AppBooking via userId
  appBookings!: AppBooking[];
  getAppBookings!: Sequelize.HasManyGetAssociationsMixin<AppBooking>;
  setAppBookings!: Sequelize.HasManySetAssociationsMixin<AppBooking, AppBookingId>;
  addAppBooking!: Sequelize.HasManyAddAssociationMixin<AppBooking, AppBookingId>;
  addAppBookings!: Sequelize.HasManyAddAssociationsMixin<AppBooking, AppBookingId>;
  createAppBooking!: Sequelize.HasManyCreateAssociationMixin<AppBooking>;
  removeAppBooking!: Sequelize.HasManyRemoveAssociationMixin<AppBooking, AppBookingId>;
  removeAppBookings!: Sequelize.HasManyRemoveAssociationsMixin<AppBooking, AppBookingId>;
  hasAppBooking!: Sequelize.HasManyHasAssociationMixin<AppBooking, AppBookingId>;
  hasAppBookings!: Sequelize.HasManyHasAssociationsMixin<AppBooking, AppBookingId>;
  countAppBookings!: Sequelize.HasManyCountAssociationsMixin;
  // AppUser hasOne AppPartner via userId
  appPartner!: AppPartner;
  getAppPartner!: Sequelize.HasOneGetAssociationMixin<AppPartner>;
  setAppPartner!: Sequelize.HasOneSetAssociationMixin<AppPartner, AppPartnerId>;
  createAppPartner!: Sequelize.HasOneCreateAssociationMixin<AppPartner>;
  // AppUser hasMany AppTransaction via creatorId
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
  // AppUser hasMany TransactionPayinRequest via userId
  transactionPayinRequests!: TransactionPayinRequest[];
  getTransactionPayinRequests!: Sequelize.HasManyGetAssociationsMixin<TransactionPayinRequest>;
  setTransactionPayinRequests!: Sequelize.HasManySetAssociationsMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  addTransactionPayinRequest!: Sequelize.HasManyAddAssociationMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  addTransactionPayinRequests!: Sequelize.HasManyAddAssociationsMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  createTransactionPayinRequest!: Sequelize.HasManyCreateAssociationMixin<TransactionPayinRequest>;
  removeTransactionPayinRequest!: Sequelize.HasManyRemoveAssociationMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  removeTransactionPayinRequests!: Sequelize.HasManyRemoveAssociationsMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  hasTransactionPayinRequest!: Sequelize.HasManyHasAssociationMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  hasTransactionPayinRequests!: Sequelize.HasManyHasAssociationsMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  countTransactionPayinRequests!: Sequelize.HasManyCountAssociationsMixin;
  // AppUser hasMany TransactionPayoutRequest via userId
  transactionPayoutRequests!: TransactionPayoutRequest[];
  getTransactionPayoutRequests!: Sequelize.HasManyGetAssociationsMixin<TransactionPayoutRequest>;
  setTransactionPayoutRequests!: Sequelize.HasManySetAssociationsMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  addTransactionPayoutRequest!: Sequelize.HasManyAddAssociationMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  addTransactionPayoutRequests!: Sequelize.HasManyAddAssociationsMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  createTransactionPayoutRequest!: Sequelize.HasManyCreateAssociationMixin<TransactionPayoutRequest>;
  removeTransactionPayoutRequest!: Sequelize.HasManyRemoveAssociationMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  removeTransactionPayoutRequests!: Sequelize.HasManyRemoveAssociationsMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  hasTransactionPayoutRequest!: Sequelize.HasManyHasAssociationMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  hasTransactionPayoutRequests!: Sequelize.HasManyHasAssociationsMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  countTransactionPayoutRequests!: Sequelize.HasManyCountAssociationsMixin;
  // AppUser hasOne UserBankAccount via userId
  userBankAccount!: UserBankAccount;
  getUserBankAccount!: Sequelize.HasOneGetAssociationMixin<UserBankAccount>;
  setUserBankAccount!: Sequelize.HasOneSetAssociationMixin<UserBankAccount, UserBankAccountId>;
  createUserBankAccount!: Sequelize.HasOneCreateAssociationMixin<UserBankAccount>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppUser {
    return sequelize.define('AppUser', {
    userId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    userAuthId: {
      type: DataTypes.STRING(80),
      allowNull: true,
      unique: "user_auth_id",
      field: 'user_auth_id'
    },
    userEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "user_email",
      field: 'user_email'
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'user_name'
    },
    userDialCode: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'app_countries',
        key: 'dial_code'
      },
      field: 'user_dial_code'
    },
    userPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'user_phone'
    },
    userLangCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "en_us",
      references: {
        model: 'app_languages',
        key: 'lang_code'
      },
      field: 'user_lang_code'
    },
    credentialsUpdated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'credentials_updated'
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    suspended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'app_users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_auth_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_auth_id" },
        ]
      },
      {
        name: "user_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_email" },
        ]
      },
      {
        name: "user_dial_code",
        using: "BTREE",
        fields: [
          { name: "user_dial_code" },
        ]
      },
      {
        name: "user_lang_code",
        using: "BTREE",
        fields: [
          { name: "user_lang_code" },
        ]
      },
    ]
  }) as typeof AppUser;
  }
}
