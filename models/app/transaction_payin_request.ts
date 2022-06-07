import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppUser, AppUserId } from './app_user';
import type { TransactionPayin, TransactionPayinCreationAttributes, TransactionPayinId } from './transaction_payin';

export interface TransactionPayinRequestAttributes {
  requestId: number;
  userId?: string;
  paymentReference?: string;
  dateFrom?: Date;
  dateTo?: Date;
  currencyCode?: string;
  amount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TransactionPayinRequestPk = "requestId";
export type TransactionPayinRequestId = TransactionPayinRequest[TransactionPayinRequestPk];
export type TransactionPayinRequestOptionalAttributes = "requestId" | "userId" | "paymentReference" | "dateFrom" | "dateTo" | "currencyCode" | "amount" | "createdAt" | "updatedAt";
export type TransactionPayinRequestCreationAttributes = Optional<TransactionPayinRequestAttributes, TransactionPayinRequestOptionalAttributes>;

export class TransactionPayinRequest extends Model<TransactionPayinRequestAttributes, TransactionPayinRequestCreationAttributes> implements TransactionPayinRequestAttributes {
  requestId!: number;
  userId?: string;
  paymentReference?: string;
  dateFrom?: Date;
  dateTo?: Date;
  currencyCode?: string;
  amount?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TransactionPayinRequest belongsTo AppCountry via currencyCode
  currencyCodeAppCountry!: AppCountry;
  getCurrencyCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCurrencyCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCurrencyCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // TransactionPayinRequest belongsTo AppUser via userId
  user!: AppUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;
  // TransactionPayinRequest hasOne TransactionPayin via requestId
  transactionPayin!: TransactionPayin;
  getTransactionPayin!: Sequelize.HasOneGetAssociationMixin<TransactionPayin>;
  setTransactionPayin!: Sequelize.HasOneSetAssociationMixin<TransactionPayin, TransactionPayinId>;
  createTransactionPayin!: Sequelize.HasOneCreateAssociationMixin<TransactionPayin>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TransactionPayinRequest {
    return sequelize.define('TransactionPayinRequest', {
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
    paymentReference: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "payment_reference",
      field: 'payment_reference'
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
    tableName: 'transaction_payin_request',
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
        name: "payment_reference",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "payment_reference" },
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
  }) as typeof TransactionPayinRequest;
  }
}
