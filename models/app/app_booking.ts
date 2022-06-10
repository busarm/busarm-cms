import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppStatus, AppStatusId } from './app_status';
import type { AppUser, AppUserId } from './app_user';
import type { BookingDiscount, BookingDiscountCreationAttributes, BookingDiscountId } from './booking_discount';
import type { BookingPromo, BookingPromoCreationAttributes, BookingPromoId } from './booking_promo';
import type { BookingTrip, BookingTripCreationAttributes, BookingTripId } from './booking_trip';
import type { BookingTripTicket, BookingTripTicketId } from './booking_trip_ticket';
import type { TransactionBooking, TransactionBookingCreationAttributes, TransactionBookingId } from './transaction_booking';
import type { TripSeat, TripSeatId } from './trip_seat';

export interface AppBookingAttributes {
  bookingId: string;
  userId: string;
  statusId: number;
  bookingFee: number;
  subTotal: number;
  currencyCode: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppBookingPk = "bookingId";
export type AppBookingId = AppBooking[AppBookingPk];
export type AppBookingOptionalAttributes = "statusId" | "createdAt" | "updatedAt";
export type AppBookingCreationAttributes = Optional<AppBookingAttributes, AppBookingOptionalAttributes>;

export class AppBooking extends Model<AppBookingAttributes, AppBookingCreationAttributes> implements AppBookingAttributes {
  bookingId!: string;
  userId!: string;
  statusId!: number;
  bookingFee!: number;
  subTotal!: number;
  currencyCode!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppBooking hasOne BookingDiscount via bookingId
  bookingDiscount!: BookingDiscount;
  getBookingDiscount!: Sequelize.HasOneGetAssociationMixin<BookingDiscount>;
  setBookingDiscount!: Sequelize.HasOneSetAssociationMixin<BookingDiscount, BookingDiscountId>;
  createBookingDiscount!: Sequelize.HasOneCreateAssociationMixin<BookingDiscount>;
  // AppBooking hasOne BookingPromo via bookingId
  bookingPromo!: BookingPromo;
  getBookingPromo!: Sequelize.HasOneGetAssociationMixin<BookingPromo>;
  setBookingPromo!: Sequelize.HasOneSetAssociationMixin<BookingPromo, BookingPromoId>;
  createBookingPromo!: Sequelize.HasOneCreateAssociationMixin<BookingPromo>;
  // AppBooking hasOne BookingTrip via bookingId
  bookingTrip!: BookingTrip;
  getBookingTrip!: Sequelize.HasOneGetAssociationMixin<BookingTrip>;
  setBookingTrip!: Sequelize.HasOneSetAssociationMixin<BookingTrip, BookingTripId>;
  createBookingTrip!: Sequelize.HasOneCreateAssociationMixin<BookingTrip>;
  // AppBooking hasMany BookingTripTicket via bookingId
  bookingTripTickets!: BookingTripTicket[];
  getBookingTripTickets!: Sequelize.HasManyGetAssociationsMixin<BookingTripTicket>;
  setBookingTripTickets!: Sequelize.HasManySetAssociationsMixin<BookingTripTicket, BookingTripTicketId>;
  addBookingTripTicket!: Sequelize.HasManyAddAssociationMixin<BookingTripTicket, BookingTripTicketId>;
  addBookingTripTickets!: Sequelize.HasManyAddAssociationsMixin<BookingTripTicket, BookingTripTicketId>;
  createBookingTripTicket!: Sequelize.HasManyCreateAssociationMixin<BookingTripTicket>;
  removeBookingTripTicket!: Sequelize.HasManyRemoveAssociationMixin<BookingTripTicket, BookingTripTicketId>;
  removeBookingTripTickets!: Sequelize.HasManyRemoveAssociationsMixin<BookingTripTicket, BookingTripTicketId>;
  hasBookingTripTicket!: Sequelize.HasManyHasAssociationMixin<BookingTripTicket, BookingTripTicketId>;
  hasBookingTripTickets!: Sequelize.HasManyHasAssociationsMixin<BookingTripTicket, BookingTripTicketId>;
  countBookingTripTickets!: Sequelize.HasManyCountAssociationsMixin;
  // AppBooking hasOne TransactionBooking via bookingId
  transactionBooking!: TransactionBooking;
  getTransactionBooking!: Sequelize.HasOneGetAssociationMixin<TransactionBooking>;
  setTransactionBooking!: Sequelize.HasOneSetAssociationMixin<TransactionBooking, TransactionBookingId>;
  createTransactionBooking!: Sequelize.HasOneCreateAssociationMixin<TransactionBooking>;
  // AppBooking hasMany TripSeat via bookingId
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
  // AppBooking belongsTo AppCountry via currencyCode
  currencyCodeAppCountry!: AppCountry;
  getCurrencyCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCurrencyCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCurrencyCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // AppBooking belongsTo AppStatus via statusId
  status!: AppStatus;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<AppStatus>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<AppStatus, AppStatusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<AppStatus>;
  // AppBooking belongsTo AppUser via userId
  user!: AppUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppBooking {
    return sequelize.define('AppBooking', {
    bookingId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'booking_id'
    },
    userId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      references: {
        model: 'app_users',
        key: 'user_id'
      },
      field: 'user_id'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      references: {
        model: 'app_status',
        key: 'status_id'
      },
      field: 'status_id'
    },
    bookingFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'booking_fee'
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'sub_total'
    },
    currencyCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      references: {
        model: 'app_countries',
        key: 'currency_code'
      },
      field: 'currency_code'
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
    tableName: 'app_booking',
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
        name: "status_id",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "currency_code",
        using: "BTREE",
        fields: [
          { name: "currency_code" },
        ]
      },
    ]
  }) as typeof AppBooking;
  }
}
