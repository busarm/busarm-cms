import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppUser, AppUserId } from './app_user';
import type { TransactionPayout, TransactionPayoutCreationAttributes, TransactionPayoutId } from './transaction_payout';

export interface TransactionPayoutRequestAttributes {
  requestId: number;
  userId?: string;
  receiverName?: string;
  receiverBank?: string;
  receiverBankCode?: string;
  receiverAccountNo?: string;
  currencyCode?: string;
  amount?: number;
  dateFrom?: Date;
  dateTo?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type TransactionPayoutRequestPk = "requestId";
export type TransactionPayoutRequestId = TransactionPayoutRequest[TransactionPayoutRequestPk];
export type TransactionPayoutRequestOptionalAttributes = "requestId" | "userId" | "receiverName" | "receiverBank" | "receiverBankCode" | "receiverAccountNo" | "currencyCode" | "amount" | "dateFrom" | "dateTo" | "createdAt" | "updatedAt";
export type TransactionPayoutRequestCreationAttributes = Optional<TransactionPayoutRequestAttributes, TransactionPayoutRequestOptionalAttributes>;

export class TransactionPayoutRequest extends Model<TransactionPayoutRequestAttributes, TransactionPayoutRequestCreationAttributes> implements TransactionPayoutRequestAttributes {
  requestId!: number;
  userId?: string;
  receiverName?: string;
  receiverBank?: string;
  receiverBankCode?: string;
  receiverAccountNo?: string;
  currencyCode?: string;
  amount?: number;
  dateFrom?: Date;
  dateTo?: Date;
  createdAt!: Date;
  updatedAt?: Date;

  // TransactionPayoutRequest belongsTo AppCountry via currencyCode
  currencyCodeAppCountry!: AppCountry;
  getCurrencyCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCurrencyCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCurrencyCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // TransactionPayoutRequest belongsTo AppUser via userId
  user!: AppUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;
  // TransactionPayoutRequest hasOne TransactionPayout via requestId
  transactionPayout!: TransactionPayout;
  getTransactionPayout!: Sequelize.HasOneGetAssociationMixin<TransactionPayout>;
  setTransactionPayout!: Sequelize.HasOneSetAssociationMixin<TransactionPayout, TransactionPayoutId>;
  createTransactionPayout!: Sequelize.HasOneCreateAssociationMixin<TransactionPayout>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TransactionPayoutRequest {
    return sequelize.define('TransactionPayoutRequest', {
    requestId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'request_id'
    },
    userId: {
      type: DataTypes.STRING(80),
      allowNull: true,
      references: {
        model: 'app_users',
        key: 'user_id'
      },
      field: 'user_id'
    },
    receiverName: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'receiver_name'
    },
    receiverBank: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'receiver_bank'
    },
    receiverBankCode: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'receiver_bank_code'
    },
    receiverAccountNo: {
      type: DataTypes.STRING(32),
      allowNull: true,
      field: 'receiver_account_no'
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_from'
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_to'
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
    tableName: 'transaction_payout_request',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "request_id" },
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof TransactionPayoutRequest;
  }
}
