import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppBus, AppBusId } from './app_bus';
import type { AppProvince, AppProvinceId } from './app_province';
import type { AppTicket, AppTicketId } from './app_ticket';
import type { AppTransaction, AppTransactionId } from './app_transaction';
import type { AppUser, AppUserId } from './app_user';
import type { CountryBankAccount, CountryBankAccountId } from './country_bank_account';
import type { CountryPaymentMethod, CountryPaymentMethodId } from './country_payment_method';
import type { TransactionPayinRequest, TransactionPayinRequestId } from './transaction_payin_request';
import type { TransactionPayoutRequest, TransactionPayoutRequestId } from './transaction_payout_request';

export interface AppCountryAttributes {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  countryImg?: string;
  dialCode: string;
  lat: number;
  lng: number;
  bookingFee?: number;
  bannerImg?: string;
  isActive?: number;
  isDefault?: number;
  tzText?: string;
  tzValue?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppCountryPk = "countryCode";
export type AppCountryId = AppCountry[AppCountryPk];
export type AppCountryOptionalAttributes = "countryImg" | "lat" | "lng" | "bookingFee" | "bannerImg" | "isActive" | "isDefault" | "tzText" | "tzValue" | "facebook" | "instagram" | "twitter" | "linkedin" | "createdAt" | "updatedAt";
export type AppCountryCreationAttributes = Optional<AppCountryAttributes, AppCountryOptionalAttributes>;

export class AppCountry extends Model<AppCountryAttributes, AppCountryCreationAttributes> implements AppCountryAttributes {
  countryCode!: string;
  countryName!: string;
  currencyCode!: string;
  countryImg?: string;
  dialCode!: string;
  lat!: number;
  lng!: number;
  bookingFee?: number;
  bannerImg?: string;
  isActive?: number;
  isDefault?: number;
  tzText?: string;
  tzValue?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppCountry hasMany AppBooking via currencyCode
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
  // AppCountry hasMany AppBus via countryCode
  appBuses!: AppBus[];
  getAppBuses!: Sequelize.HasManyGetAssociationsMixin<AppBus>;
  setAppBuses!: Sequelize.HasManySetAssociationsMixin<AppBus, AppBusId>;
  addAppBus!: Sequelize.HasManyAddAssociationMixin<AppBus, AppBusId>;
  addAppBuses!: Sequelize.HasManyAddAssociationsMixin<AppBus, AppBusId>;
  createAppBus!: Sequelize.HasManyCreateAssociationMixin<AppBus>;
  removeAppBus!: Sequelize.HasManyRemoveAssociationMixin<AppBus, AppBusId>;
  removeAppBuses!: Sequelize.HasManyRemoveAssociationsMixin<AppBus, AppBusId>;
  hasAppBus!: Sequelize.HasManyHasAssociationMixin<AppBus, AppBusId>;
  hasAppBuses!: Sequelize.HasManyHasAssociationsMixin<AppBus, AppBusId>;
  countAppBuses!: Sequelize.HasManyCountAssociationsMixin;
  // AppCountry hasMany AppProvince via countryCode
  appProvinces!: AppProvince[];
  getAppProvinces!: Sequelize.HasManyGetAssociationsMixin<AppProvince>;
  setAppProvinces!: Sequelize.HasManySetAssociationsMixin<AppProvince, AppProvinceId>;
  addAppProvince!: Sequelize.HasManyAddAssociationMixin<AppProvince, AppProvinceId>;
  addAppProvinces!: Sequelize.HasManyAddAssociationsMixin<AppProvince, AppProvinceId>;
  createAppProvince!: Sequelize.HasManyCreateAssociationMixin<AppProvince>;
  removeAppProvince!: Sequelize.HasManyRemoveAssociationMixin<AppProvince, AppProvinceId>;
  removeAppProvinces!: Sequelize.HasManyRemoveAssociationsMixin<AppProvince, AppProvinceId>;
  hasAppProvince!: Sequelize.HasManyHasAssociationMixin<AppProvince, AppProvinceId>;
  hasAppProvinces!: Sequelize.HasManyHasAssociationsMixin<AppProvince, AppProvinceId>;
  countAppProvinces!: Sequelize.HasManyCountAssociationsMixin;
  // AppCountry hasMany AppTicket via currencyCode
  appTickets!: AppTicket[];
  getAppTickets!: Sequelize.HasManyGetAssociationsMixin<AppTicket>;
  setAppTickets!: Sequelize.HasManySetAssociationsMixin<AppTicket, AppTicketId>;
  addAppTicket!: Sequelize.HasManyAddAssociationMixin<AppTicket, AppTicketId>;
  addAppTickets!: Sequelize.HasManyAddAssociationsMixin<AppTicket, AppTicketId>;
  createAppTicket!: Sequelize.HasManyCreateAssociationMixin<AppTicket>;
  removeAppTicket!: Sequelize.HasManyRemoveAssociationMixin<AppTicket, AppTicketId>;
  removeAppTickets!: Sequelize.HasManyRemoveAssociationsMixin<AppTicket, AppTicketId>;
  hasAppTicket!: Sequelize.HasManyHasAssociationMixin<AppTicket, AppTicketId>;
  hasAppTickets!: Sequelize.HasManyHasAssociationsMixin<AppTicket, AppTicketId>;
  countAppTickets!: Sequelize.HasManyCountAssociationsMixin;
  // AppCountry hasMany AppTransaction via currencyCode
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
  // AppCountry hasMany AppUser via userDialCode
  appUsers!: AppUser[];
  getAppUsers!: Sequelize.HasManyGetAssociationsMixin<AppUser>;
  setAppUsers!: Sequelize.HasManySetAssociationsMixin<AppUser, AppUserId>;
  addAppUser!: Sequelize.HasManyAddAssociationMixin<AppUser, AppUserId>;
  addAppUsers!: Sequelize.HasManyAddAssociationsMixin<AppUser, AppUserId>;
  createAppUser!: Sequelize.HasManyCreateAssociationMixin<AppUser>;
  removeAppUser!: Sequelize.HasManyRemoveAssociationMixin<AppUser, AppUserId>;
  removeAppUsers!: Sequelize.HasManyRemoveAssociationsMixin<AppUser, AppUserId>;
  hasAppUser!: Sequelize.HasManyHasAssociationMixin<AppUser, AppUserId>;
  hasAppUsers!: Sequelize.HasManyHasAssociationsMixin<AppUser, AppUserId>;
  countAppUsers!: Sequelize.HasManyCountAssociationsMixin;
  // AppCountry hasMany CountryBankAccount via countryCode
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
  // AppCountry hasMany CountryPaymentMethod via countryCode
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
  // AppCountry hasMany TransactionPayinRequest via currencyCode
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
  // AppCountry hasMany TransactionPayoutRequest via currencyCode
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

  static initModel(sequelize: Sequelize.Sequelize): typeof AppCountry {
    return sequelize.define('AppCountry', {
    countryCode: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true,
      field: 'country_code'
    },
    countryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'country_name'
    },
    currencyCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      field: 'currency_code'
    },
    countryImg: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'country_img'
    },
    dialCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: "dial_code",
      field: 'dial_code'
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    bookingFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'booking_fee'
    },
    bannerImg: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'banner_img'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'is_active'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'is_default'
    },
    tzText: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'tz_text'
    },
    tzValue: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'tz_value'
    },
    facebook: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING(32),
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
    tableName: 'app_countries',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "country_code" },
        ]
      },
      {
        name: "dial_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dial_code" },
        ]
      },
      {
        name: "currency_code",
        using: "BTREE",
        fields: [
          { name: "currency_code" },
        ]
      },
      {
        name: "country_name",
        type: "FULLTEXT",
        fields: [
          { name: "country_name" },
        ]
      },
    ]
  }) as typeof AppCountry;
  }
}
