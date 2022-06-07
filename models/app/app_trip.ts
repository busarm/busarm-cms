import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppAgent, AppAgentId } from './app_agent';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppStatus, AppStatusId } from './app_status';
import type { AppTicket, AppTicketId } from './app_ticket';
import type { BookingTrip, BookingTripId } from './booking_trip';
import type { BusType, BusTypeId } from './bus_type';
import type { TripBus, TripBusId } from './trip_bus';
import type { TripSeat, TripSeatId } from './trip_seat';

export interface AppTripAttributes {
  tripId: number;
  tripDate: Date;
  statusId: number;
  pickupLocId: number;
  dropoffLocId: number;
  ticketId: number;
  busTypeId: number;
  agentId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppTripPk = "tripId";
export type AppTripId = AppTrip[AppTripPk];
export type AppTripOptionalAttributes = "tripId" | "statusId" | "createdAt" | "updatedAt";
export type AppTripCreationAttributes = Optional<AppTripAttributes, AppTripOptionalAttributes>;

export class AppTrip extends Model<AppTripAttributes, AppTripCreationAttributes> implements AppTripAttributes {
  tripId!: number;
  tripDate!: Date;
  statusId!: number;
  pickupLocId!: number;
  dropoffLocId!: number;
  ticketId!: number;
  busTypeId!: number;
  agentId!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppTrip belongsTo AppAgent via agentId
  agent!: AppAgent;
  getAgent!: Sequelize.BelongsToGetAssociationMixin<AppAgent>;
  setAgent!: Sequelize.BelongsToSetAssociationMixin<AppAgent, AppAgentId>;
  createAgent!: Sequelize.BelongsToCreateAssociationMixin<AppAgent>;
  // AppTrip belongsTo AppLocation via dropoffLocId
  dropoffLoc!: AppLocation;
  getDropoffLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setDropoffLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createDropoffLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // AppTrip belongsTo AppLocation via pickupLocId
  pickupLoc!: AppLocation;
  getPickupLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setPickupLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createPickupLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // AppTrip belongsTo AppStatus via statusId
  status!: AppStatus;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<AppStatus>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<AppStatus, AppStatusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<AppStatus>;
  // AppTrip belongsTo AppTicket via ticketId
  ticket!: AppTicket;
  getTicket!: Sequelize.BelongsToGetAssociationMixin<AppTicket>;
  setTicket!: Sequelize.BelongsToSetAssociationMixin<AppTicket, AppTicketId>;
  createTicket!: Sequelize.BelongsToCreateAssociationMixin<AppTicket>;
  // AppTrip hasMany BookingTrip via tripId
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
  // AppTrip hasMany TripBus via agentId
  tripBuses!: TripBus[];
  getTripBuses!: Sequelize.HasManyGetAssociationsMixin<TripBus>;
  setTripBuses!: Sequelize.HasManySetAssociationsMixin<TripBus, TripBusId>;
  addTripBus!: Sequelize.HasManyAddAssociationMixin<TripBus, TripBusId>;
  addTripBuses!: Sequelize.HasManyAddAssociationsMixin<TripBus, TripBusId>;
  createTripBus!: Sequelize.HasManyCreateAssociationMixin<TripBus>;
  removeTripBus!: Sequelize.HasManyRemoveAssociationMixin<TripBus, TripBusId>;
  removeTripBuses!: Sequelize.HasManyRemoveAssociationsMixin<TripBus, TripBusId>;
  hasTripBus!: Sequelize.HasManyHasAssociationMixin<TripBus, TripBusId>;
  hasTripBuses!: Sequelize.HasManyHasAssociationsMixin<TripBus, TripBusId>;
  countTripBuses!: Sequelize.HasManyCountAssociationsMixin;
  // AppTrip hasMany TripSeat via tripId
  tripSeats!: TripSeat[];
  getTripSeats!: Sequelize.HasManyGetAssociationsMixin<TripSeat>;
  setTripSeats!: Sequelize.HasManySetAssociationsMixin<TripSeat, TripSeatId>;
  addTripSeat!: Sequelize.HasManyAddAssociationMixin<TripSeat, TripSeatId>;
  addTripSeats!: Sequelize.HasManyAddAssociationsMixin<TripSeat, TripSeatId>;
  createTripSeat!: Sequelize.HasManyCreateAssociationMixin<TripSeat>;
  removeTripSeat!: Sequelize.HasManyRemoveAssociationMixin<TripSeat, TripSeatId>;
  removeTripSeats!: Sequelize.HasManyRemoveAssociationsMixin<TripSeat, TripSeatId>;
  hasTripSeat!: Sequelize.HasManyHasAssociationMixin<TripSeat, TripSeatId>;
  hasTripSeats!: Sequelize.HasManyHasAssociationsMixin<TripSeat, TripSeatId>;
  countTripSeats!: Sequelize.HasManyCountAssociationsMixin;
  // AppTrip belongsTo BusType via busTypeId
  busType!: BusType;
  getBusType!: Sequelize.BelongsToGetAssociationMixin<BusType>;
  setBusType!: Sequelize.BelongsToSetAssociationMixin<BusType, BusTypeId>;
  createBusType!: Sequelize.BelongsToCreateAssociationMixin<BusType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppTrip {
    return sequelize.define('AppTrip', {
    tripId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'trip_id'
    },
    tripDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'trip_date'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'app_status',
        key: 'status_id'
      },
      field: 'status_id'
    },
    pickupLocId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'pickup_loc_id'
    },
    dropoffLocId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'dropoff_loc_id'
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_tickets',
        key: 'ticket_id'
      },
      field: 'ticket_id'
    },
    busTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bus_types',
        key: 'type_id'
      },
      field: 'bus_type_id'
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_agents',
        key: 'agent_id'
      },
      field: 'agent_id'
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
    tableName: 'app_trips',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
        ]
      },
      {
        name: "trip_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "bus_type_id" },
          { name: "agent_id" },
        ]
      },
      {
        name: "agent_id",
        using: "BTREE",
        fields: [
          { name: "agent_id" },
        ]
      },
      {
        name: "status_id",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
      {
        name: "bus_type_id",
        using: "BTREE",
        fields: [
          { name: "bus_type_id" },
        ]
      },
      {
        name: "dropoff_loc_id",
        using: "BTREE",
        fields: [
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
        name: "ticket_id",
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
    ]
  }) as typeof AppTrip;
  }
}
