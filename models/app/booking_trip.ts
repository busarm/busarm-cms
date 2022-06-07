import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppTrip, AppTripId } from './app_trip';

export interface BookingTripAttributes {
  bookingId: string;
  tripId: number;
  referenceCode: string;
  qrcodeUrl?: string;
  isReserved: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type BookingTripPk = "bookingId";
export type BookingTripId = BookingTrip[BookingTripPk];
export type BookingTripOptionalAttributes = "qrcodeUrl" | "createdAt" | "updatedAt";
export type BookingTripCreationAttributes = Optional<BookingTripAttributes, BookingTripOptionalAttributes>;

export class BookingTrip extends Model<BookingTripAttributes, BookingTripCreationAttributes> implements BookingTripAttributes {
  bookingId!: string;
  tripId!: number;
  referenceCode!: string;
  qrcodeUrl?: string;
  isReserved!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // BookingTrip belongsTo AppBooking via bookingId
  booking!: AppBooking;
  getBooking!: Sequelize.BelongsToGetAssociationMixin<AppBooking>;
  setBooking!: Sequelize.BelongsToSetAssociationMixin<AppBooking, AppBookingId>;
  createBooking!: Sequelize.BelongsToCreateAssociationMixin<AppBooking>;
  // BookingTrip belongsTo AppTrip via tripId
  trip!: AppTrip;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BookingTrip {
    return sequelize.define('BookingTrip', {
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
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_trips',
        key: 'trip_id'
      },
      field: 'trip_id'
    },
    referenceCode: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: "reference_code",
      field: 'reference_code'
    },
    qrcodeUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'qrcode_url'
    },
    isReserved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_reserved'
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
    tableName: 'booking_trip',
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
        name: "reference_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reference_code" },
        ]
      },
      {
        name: "trip_id",
        using: "BTREE",
        fields: [
          { name: "trip_id" },
        ]
      },
    ]
  }) as typeof BookingTrip;
  }
}
