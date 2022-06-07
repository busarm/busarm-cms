import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppPaymentMethod, AppPaymentMethodId } from './app_payment_method';
import type { AppStatus, AppStatusId } from './app_status';
import type { AppUser, AppUserId } from './app_user';
import type { TransactionBooking, TransactionBookingCreationAttributes, TransactionBookingId } from './transaction_booking';
import type { TransactionPayin, TransactionPayinCreationAttributes, TransactionPayinId } from './transaction_payin';
import type { TransactionPayout, TransactionPayoutCreationAttributes, TransactionPayoutId } from './transaction_payout';

export interface AppTransactionAttributes {
  transactionId: string;
  transactionMethod?: number;
  transactionFee?: number;
  creatorId?: string;
  statusId?: number;
  statusInfo?: string;
  amount?: number;
  currencyCode?: string;
  type?: string;
  attemptedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppTransactionPk = "transactionId";
export type AppTransactionId = AppTransaction[AppTransactionPk];
export type AppTransactionOptionalAttributes = "transactionMethod" | "transactionFee" | "creatorId" | "statusId" | "statusInfo" | "amount" | "currencyCode" | "type" | "attemptedAt" | "createdAt" | "updatedAt";
export type AppTransactionCreationAttributes = Optional<AppTransactionAttributes, AppTransactionOptionalAttributes>;

export class AppTransaction extends Model<AppTransactionAttributes, AppTransactionCreationAttributes> implements AppTransactionAttributes {
  transactionId!: string;
  transactionMethod?: number;
  transactionFee?: number;
  creatorId?: string;
  statusId?: number;
  statusInfo?: string;
  amount?: number;
  currencyCode?: string;
  type?: string;
  attemptedAt?: Date;
  createdAt!: Date;
  updatedAt?: Date;

  // AppTransaction belongsTo AppCountry via currencyCode
  currencyCodeAppCountry!: AppCountry;
  getCurrencyCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCurrencyCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCurrencyCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // AppTransaction belongsTo AppPaymentMethod via transactionMethod
  transactionMethodAppPaymentMethod!: AppPaymentMethod;
  getTransactionMethodAppPaymentMethod!: Sequelize.BelongsToGetAssociationMixin<AppPaymentMethod>;
  setTransactionMethodAppPaymentMethod!: Sequelize.BelongsToSetAssociationMixin<AppPaymentMethod, AppPaymentMethodId>;
  createTransactionMethodAppPaymentMethod!: Sequelize.BelongsToCreateAssociationMixin<AppPaymentMethod>;
  // AppTransaction belongsTo AppStatus via statusId
  status!: AppStatus;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<AppStatus>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<AppStatus, AppStatusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<AppStatus>;
  // AppTransaction hasOne TransactionBooking via transactionId
  transactionBooking!: TransactionBooking;
  getTransactionBooking!: Sequelize.HasOneGetAssociationMixin<TransactionBooking>;
  setTransactionBooking!: Sequelize.HasOneSetAssociationMixin<TransactionBooking, TransactionBookingId>;
  createTransactionBooking!: Sequelize.HasOneCreateAssociationMixin<TransactionBooking>;
  // AppTransaction hasOne TransactionPayin via transactionId
  transactionPayin!: TransactionPayin;
  getTransactionPayin!: Sequelize.HasOneGetAssociationMixin<TransactionPayin>;
  setTransactionPayin!: Sequelize.HasOneSetAssociationMixin<TransactionPayin, TransactionPayinId>;
  createTransactionPayin!: Sequelize.HasOneCreateAssociationMixin<TransactionPayin>;
  // AppTransaction hasOne TransactionPayout via transactionId
  transactionPayout!: TransactionPayout;
  getTransactionPayout!: Sequelize.HasOneGetAssociationMixin<TransactionPayout>;
  setTransactionPayout!: Sequelize.HasOneSetAssociationMixin<TransactionPayout, TransactionPayoutId>;
  createTransactionPayout!: Sequelize.HasOneCreateAssociationMixin<TransactionPayout>;
  // AppTransaction belongsTo AppUser via creatorId
  creator!: AppUser;
  getCreator!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setCreator!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createCreator!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppTransaction {
    return sequelize.define('AppTransaction', {
    transactionId: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
      field: 'transaction_id'
    },
    transactionMethod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_payment_methods',
        key: 'method_id'
      },
      field: 'transaction_method'
    },
    transactionFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      field: 'transaction_fee'
    },
    creatorId: {
      type: DataTypes.STRING(80),
      allowNull: true,
      comment: "User who create this transaction. The transaction could be created by a different user from the user whom the transaction belongs to. E.g If a user made manual payments, an admin will be the one creating this transactin manually. This column will then record that admin who created the transaction",
      references: {
        model: 'app_users',
        key: 'user_id'
      },
      field: 'creator_id'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_status',
        key: 'status_id'
      },
      field: 'status_id'
    },
    statusInfo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'status_info'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    currencyCode: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'app_countries',
        key: 'currency_code'
      },
      field: 'currency_code'
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    attemptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'attempted_at'
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
    tableName: 'app_transactions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transaction_id" },
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
        name: "transaction_method",
        using: "BTREE",
        fields: [
          { name: "transaction_method" },
        ]
      },
      {
        name: "status_id",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
      {
        name: "creator_id",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  }) as typeof AppTransaction;
  }
}
