import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppTrip, AppTripId } from './app_trip';
import type { TripDropoff, TripDropoffId } from './trip_dropoff';
import type { TripPickup, TripPickupId } from './trip_pickup';

export interface BookingTripAttributes {
  bookingId: string;
  pickupId: number;
  dropoffId: number;
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
  pickupId!: number;
  dropoffId!: number;
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
  // BookingTrip belongsTo TripDropoff via dropoffId
  dropoff!: TripDropoff;
  getDropoff!: Sequelize.BelongsToGetAssociationMixin<TripDropoff>;
  setDropoff!: Sequelize.BelongsToSetAssociationMixin<TripDropoff, TripDropoffId>;
  createDropoff!: Sequelize.BelongsToCreateAssociationMixin<TripDropoff>;
  // BookingTrip belongsTo TripPickup via pickupId
  pickup!: TripPickup;
  getPickup!: Sequelize.BelongsToGetAssociationMixin<TripPickup>;
  setPickup!: Sequelize.BelongsToSetAssociationMixin<TripPickup, TripPickupId>;
  createPickup!: Sequelize.BelongsToCreateAssociationMixin<TripPickup>;

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
    pickupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trip_pickup',
        key: 'id'
      },
      field: 'pickup_id'
    },
    dropoffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trip_dropoff',
        key: 'id'
      },
      field: 'dropoff_id'
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
      {
        name: "pickup_id",
        using: "BTREE",
        fields: [
          { name: "pickup_id" },
        ]
      },
      {
        name: "dropoff_id",
        using: "BTREE",
        fields: [
          { name: "dropoff_id" },
        ]
      },
    ]
  }) as typeof BookingTrip;
  }
}
