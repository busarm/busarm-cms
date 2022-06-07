import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppTransaction, AppTransactionId } from './app_transaction';
import type { TransactionPayoutRequest, TransactionPayoutRequestId } from './transaction_payout_request';

export interface TransactionPayoutAttributes {
  transactionId: string;
  requestId: number;
  transferFee?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TransactionPayoutPk = "transactionId";
export type TransactionPayoutId = TransactionPayout[TransactionPayoutPk];
export type TransactionPayoutOptionalAttributes = "transferFee" | "createdAt" | "updatedAt";
export type TransactionPayoutCreationAttributes = Optional<TransactionPayoutAttributes, TransactionPayoutOptionalAttributes>;

export class TransactionPayout extends Model<TransactionPayoutAttributes, TransactionPayoutCreationAttributes> implements TransactionPayoutAttributes {
  transactionId!: string;
  requestId!: number;
  transferFee?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TransactionPayout belongsTo AppTransaction via transactionId
  transaction!: AppTransaction;
  getTransaction!: Sequelize.BelongsToGetAssociationMixin<AppTransaction>;
  setTransaction!: Sequelize.BelongsToSetAssociationMixin<AppTransaction, AppTransactionId>;
  createTransaction!: Sequelize.BelongsToCreateAssociationMixin<AppTransaction>;
  // TransactionPayout belongsTo TransactionPayoutRequest via requestId
  request!: TransactionPayoutRequest;
  getRequest!: Sequelize.BelongsToGetAssociationMixin<TransactionPayoutRequest>;
  setRequest!: Sequelize.BelongsToSetAssociationMixin<TransactionPayoutRequest, TransactionPayoutRequestId>;
  createRequest!: Sequelize.BelongsToCreateAssociationMixin<TransactionPayoutRequest>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TransactionPayout {
    return sequelize.define('TransactionPayout', {
    transactionId: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_transactions',
        key: 'transaction_id'
      },
      field: 'transaction_id'
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transaction_payout_request',
        key: 'request_id'
      },
      unique: "transaction_payout_ibfk_2",
      field: 'request_id'
    },
    transferFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'transfer_fee'
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
    tableName: 'transaction_payout',
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
        name: "request_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
      {
        name: "request_id_2",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
    ]
  }) as typeof TransactionPayout;
  }
}
