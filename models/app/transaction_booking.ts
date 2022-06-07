import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppTransaction, AppTransactionId } from './app_transaction';

export interface TransactionBookingAttributes {
  transactionId: string;
  bookingId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type TransactionBookingPk = "transactionId";
export type TransactionBookingId = TransactionBooking[TransactionBookingPk];
export type TransactionBookingOptionalAttributes = "bookingId" | "createdAt" | "updatedAt";
export type TransactionBookingCreationAttributes = Optional<TransactionBookingAttributes, TransactionBookingOptionalAttributes>;

export class TransactionBooking extends Model<TransactionBookingAttributes, TransactionBookingCreationAttributes> implements TransactionBookingAttributes {
  transactionId!: string;
  bookingId?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // TransactionBooking belongsTo AppBooking via bookingId
  booking!: AppBooking;
  getBooking!: Sequelize.BelongsToGetAssociationMixin<AppBooking>;
  setBooking!: Sequelize.BelongsToSetAssociationMixin<AppBooking, AppBookingId>;
  createBooking!: Sequelize.BelongsToCreateAssociationMixin<AppBooking>;
  // TransactionBooking belongsTo AppTransaction via transactionId
  transaction!: AppTransaction;
  getTransaction!: Sequelize.BelongsToGetAssociationMixin<AppTransaction>;
  setTransaction!: Sequelize.BelongsToSetAssociationMixin<AppTransaction, AppTransactionId>;
  createTransaction!: Sequelize.BelongsToCreateAssociationMixin<AppTransaction>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TransactionBooking {
    return sequelize.define('TransactionBooking', {
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
    bookingId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'app_booking',
        key: 'booking_id'
      },
      unique: "transaction_booking_ibfk_1",
      field: 'booking_id'
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
    tableName: 'transaction_booking',
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
        name: "booking_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "booking_id_2",
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
    ]
  }) as typeof TransactionBooking;
  }
}
