import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppPromo, AppPromoId } from './app_promo';

export interface BookingPromoAttributes {
  bookingId: string;
  promoCode: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type BookingPromoPk = "bookingId";
export type BookingPromoId = BookingPromo[BookingPromoPk];
export type BookingPromoOptionalAttributes = "createdAt" | "updatedAt";
export type BookingPromoCreationAttributes = Optional<BookingPromoAttributes, BookingPromoOptionalAttributes>;

export class BookingPromo extends Model<BookingPromoAttributes, BookingPromoCreationAttributes> implements BookingPromoAttributes {
  bookingId!: string;
  promoCode!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // BookingPromo belongsTo AppBooking via bookingId
  booking!: AppBooking;
  getBooking!: Sequelize.BelongsToGetAssociationMixin<AppBooking>;
  setBooking!: Sequelize.BelongsToSetAssociationMixin<AppBooking, AppBookingId>;
  createBooking!: Sequelize.BelongsToCreateAssociationMixin<AppBooking>;
  // BookingPromo belongsTo AppPromo via promoCode
  promoCodeAppPromo!: AppPromo;
  getPromoCodeAppPromo!: Sequelize.BelongsToGetAssociationMixin<AppPromo>;
  setPromoCodeAppPromo!: Sequelize.BelongsToSetAssociationMixin<AppPromo, AppPromoId>;
  createPromoCodeAppPromo!: Sequelize.BelongsToCreateAssociationMixin<AppPromo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BookingPromo {
    return sequelize.define('BookingPromo', {
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
    promoCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'app_promo',
        key: 'promo_code'
      },
      field: 'promo_code'
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
    tableName: 'booking_promo',
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
        name: "promo_code",
        using: "BTREE",
        fields: [
          { name: "promo_code" },
        ]
      },
    ]
  }) as typeof BookingPromo;
  }
}
