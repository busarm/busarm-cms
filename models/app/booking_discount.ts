import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppDiscount, AppDiscountId } from './app_discount';

export interface BookingDiscountAttributes {
  bookingId: string;
  discountCode: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type BookingDiscountPk = "bookingId";
export type BookingDiscountId = BookingDiscount[BookingDiscountPk];
export type BookingDiscountOptionalAttributes = "createdAt" | "updatedAt";
export type BookingDiscountCreationAttributes = Optional<BookingDiscountAttributes, BookingDiscountOptionalAttributes>;

export class BookingDiscount extends Model<BookingDiscountAttributes, BookingDiscountCreationAttributes> implements BookingDiscountAttributes {
  bookingId!: string;
  discountCode!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // BookingDiscount belongsTo AppBooking via bookingId
  booking!: AppBooking;
  getBooking!: Sequelize.BelongsToGetAssociationMixin<AppBooking>;
  setBooking!: Sequelize.BelongsToSetAssociationMixin<AppBooking, AppBookingId>;
  createBooking!: Sequelize.BelongsToCreateAssociationMixin<AppBooking>;
  // BookingDiscount belongsTo AppDiscount via discountCode
  discountCodeAppDiscount!: AppDiscount;
  getDiscountCodeAppDiscount!: Sequelize.BelongsToGetAssociationMixin<AppDiscount>;
  setDiscountCodeAppDiscount!: Sequelize.BelongsToSetAssociationMixin<AppDiscount, AppDiscountId>;
  createDiscountCodeAppDiscount!: Sequelize.BelongsToCreateAssociationMixin<AppDiscount>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BookingDiscount {
    return sequelize.define('BookingDiscount', {
    bookingId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_booking',
        key: 'booking_id'
      },
      field: 'booking_id'
    },
    discountCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'app_discounts',
        key: 'discount_code'
      },
      field: 'discount_code'
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
    tableName: 'booking_discounts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "discount_code",
        using: "BTREE",
        fields: [
          { name: "discount_code" },
        ]
      },
    ]
  }) as typeof BookingDiscount;
  }
}
