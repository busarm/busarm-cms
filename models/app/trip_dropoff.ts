import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppTrip, AppTripId } from './app_trip';
import type { BookingTrip, BookingTripId } from './booking_trip';

export interface TripDropoffAttributes {
  id: number;
  tripId: number;
  locId: number;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TripDropoffPk = "id";
export type TripDropoffId = TripDropoff[TripDropoffPk];
export type TripDropoffOptionalAttributes = "id" | "isActive" | "createdAt" | "updatedAt";
export type TripDropoffCreationAttributes = Optional<TripDropoffAttributes, TripDropoffOptionalAttributes>;

export class TripDropoff extends Model<TripDropoffAttributes, TripDropoffCreationAttributes> implements TripDropoffAttributes {
  id!: number;
  tripId!: number;
  locId!: number;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TripDropoff belongsTo AppLocation via locId
  loc!: AppLocation;
  getLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // TripDropoff belongsTo AppTrip via tripId
  trip!: AppTrip;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;
  // TripDropoff hasMany BookingTrip via dropoffId
  bookingTrips!: BookingTrip[];
  getBookingTrips!: Sequelize.HasManyGetAssociationsMixin<BookingTrip>;
  setBookingTrips!: Sequelize.HasManySetAssociationsMixin<BookingTrip, BookingTripId>;
  addBookingTrip!: Sequelize.HasManyAddAssociationMixin<BookingTrip, BookingTripId>;
  addBookingTrips!: Sequelize.HasManyAddAssociationsMixin<BookingTrip, BookingTripId>;
  createBookingTrip!: Sequelize.HasManyCreateAssociationMixin<BookingTrip>;
  removeBookingTrip!: Sequelize.HasManyRemoveAssociationMixin<BookingTrip, BookingTripId>;
  removeBookingTrips!: Sequelize.HasManyRemoveAssociationsMixin<BookingTrip, BookingTripId>;
  hasBookingTrip!: Sequelize.HasManyHasAssociationMixin<BookingTrip, BookingTripId>;
  hasBookingTrips!: Sequelize.HasManyHasAssociationsMixin<BookingTrip, BookingTripId>;
  countBookingTrips!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof TripDropoff {
    return sequelize.define('TripDropoff', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    locId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'loc_id'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      field: 'is_active'
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
    tableName: 'trip_dropoff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "trip_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "loc_id" },
        ]
      },
      {
        name: "loc_id",
        using: "BTREE",
        fields: [
          { name: "loc_id" },
        ]
      },
    ]
  }) as typeof TripDropoff;
  }
}
