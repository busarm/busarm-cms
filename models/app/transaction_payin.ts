import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppTransaction, AppTransactionId } from './app_transaction';
import type { TransactionPayinRequest, TransactionPayinRequestId } from './transaction_payin_request';

export interface TransactionPayinAttributes {
  transactionId: string;
  requestId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TransactionPayinPk = "transactionId";
export type TransactionPayinId = TransactionPayin[TransactionPayinPk];
export type TransactionPayinOptionalAttributes = "createdAt" | "updatedAt";
export type TransactionPayinCreationAttributes = Optional<TransactionPayinAttributes, TransactionPayinOptionalAttributes>;

export class TransactionPayin extends Model<TransactionPayinAttributes, TransactionPayinCreationAttributes> implements TransactionPayinAttributes {
  transactionId!: string;
  requestId!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TransactionPayin belongsTo AppTransaction via transactionId
  transaction!: AppTransaction;
  getTransaction!: Sequelize.BelongsToGetAssociationMixin<AppTransaction>;
  setTransaction!: Sequelize.BelongsToSetAssociationMixin<AppTransaction, AppTransactionId>;
  createTransaction!: Sequelize.BelongsToCreateAssociationMixin<AppTransaction>;
  // TransactionPayin belongsTo TransactionPayinRequest via requestId
  request!: TransactionPayinRequest;
  getRequest!: Sequelize.BelongsToGetAssociationMixin<TransactionPayinRequest>;
  setRequest!: Sequelize.BelongsToSetAssociationMixin<TransactionPayinRequest, TransactionPayinRequestId>;
  createRequest!: Sequelize.BelongsToCreateAssociationMixin<TransactionPayinRequest>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TransactionPayin {
    return sequelize.define('TransactionPayin', {
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
        model: 'transaction_payin_request',
        key: 'request_id'
      },
      unique: "transaction_payin_ibfk_2",
      field: 'request_id'
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
    tableName: 'transaction_payin',
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
  }) as typeof TransactionPayin;
  }
}
