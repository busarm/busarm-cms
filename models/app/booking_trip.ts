import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppLocation, AppLocationId } from './app_location';
import type { TripDropoff, TripDropoffId } from './trip_dropoff';

export interface BookingTripAttributes {
  bookingId: string;
  pickupLocId?: number;
  dropoffLocId?: number;
  tripId: number;
  referenceCode: string;
  qrcodeUrl?: string;
  isReserved: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type BookingTripPk = "bookingId";
export type BookingTripId = BookingTrip[BookingTripPk];
export type BookingTripOptionalAttributes = "pickupLocId" | "dropoffLocId" | "qrcodeUrl" | "createdAt" | "updatedAt";
export type BookingTripCreationAttributes = Optional<BookingTripAttributes, BookingTripOptionalAttributes>;

export class BookingTrip extends Model<BookingTripAttributes, BookingTripCreationAttributes> implements BookingTripAttributes {
  bookingId!: string;
  pickupLocId?: number;
  dropoffLocId?: number;
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
  // BookingTrip belongsTo AppLocation via pickupLocId
  pickupLoc!: AppLocation;
  getPickupLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setPickupLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createPickupLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // BookingTrip belongsTo AppLocation via dropoffLocId
  dropoffLoc!: AppLocation;
  getDropoffLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setDropoffLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createDropoffLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // BookingTrip belongsTo TripDropoff via tripId
  trip!: TripDropoff;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<TripDropoff>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<TripDropoff, TripDropoffId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<TripDropoff>;

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
    pickupLocId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'pickup_loc_id'
    },
    dropoffLocId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'dropoff_loc_id'
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trip_dropoff',
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
        name: "trip_id_2",
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "pickup_loc_id" },
        ]
      },
      {
        name: "trip_id_3",
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "dropoff_loc_id" },
        ]
      },
      {
        name: "pickup_loc_id",
        using: "BTREE",
        fields: [
          { name: "pickup_loc_id" },
        ]
      },
      {
        name: "dropoff_loc_id",
        using: "BTREE",
        fields: [
          { name: "dropoff_loc_id" },
        ]
      },
    ]
  }) as typeof BookingTrip;
  }
}
