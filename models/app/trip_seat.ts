import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppTrip, AppTripId } from './app_trip';

export interface TripSeatAttributes {
  tripId: number;
  seatId: number;
  bookingId?: string;
  bookingSessionId?: string;
  dateLocked?: Date;
  dateReserved?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type TripSeatPk = "tripId" | "seatId";
export type TripSeatId = TripSeat[TripSeatPk];
export type TripSeatOptionalAttributes = "bookingId" | "bookingSessionId" | "dateLocked" | "dateReserved" | "createdAt" | "updatedAt";
export type TripSeatCreationAttributes = Optional<TripSeatAttributes, TripSeatOptionalAttributes>;

export class TripSeat extends Model<TripSeatAttributes, TripSeatCreationAttributes> implements TripSeatAttributes {
  tripId!: number;
  seatId!: number;
  bookingId?: string;
  bookingSessionId?: string;
  dateLocked?: Date;
  dateReserved?: Date;
  createdAt!: Date;
  updatedAt?: Date;

  // TripSeat belongsTo AppBooking via bookingId
  booking!: AppBooking;
  getBooking!: Sequelize.BelongsToGetAssociationMixin<AppBooking>;
  setBooking!: Sequelize.BelongsToSetAssociationMixin<AppBooking, AppBookingId>;
  createBooking!: Sequelize.BelongsToCreateAssociationMixin<AppBooking>;
  // TripSeat belongsTo AppTrip via tripId
  trip!: AppTrip;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TripSeat {
    return sequelize.define('TripSeat', {
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_trips',
        key: 'trip_id'
      },
      field: 'trip_id'
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'seat_id'
    },
    bookingId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'app_booking',
        key: 'booking_id'
      },
      field: 'booking_id'
    },
    bookingSessionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'booking_session_id'
    },
    dateLocked: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_locked'
    },
    dateReserved: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_reserved'
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
    tableName: 'trip_seats',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "seat_id" },
        ]
      },
      {
        name: "booking_id",
        using: "BTREE",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "booking_session_id",
        using: "BTREE",
        fields: [
          { name: "booking_session_id" },
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
  }) as typeof TripSeat;
  }
}
