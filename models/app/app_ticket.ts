import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppCountry, AppCountryId } from './app_country';
import type { AppTrip, AppTripId } from './app_trip';
import type { BookingTripTicket, BookingTripTicketId } from './booking_trip_ticket';
import type { TicketType, TicketTypeId } from './ticket_type';

export interface AppTicketAttributes {
  id: number;
  ticketId: number;
  ticketTypeId: number;
  ticketPrice: number;
  currencyCode?: string;
  isActive: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppTicketPk = "id";
export type AppTicketId = AppTicket[AppTicketPk];
export type AppTicketOptionalAttributes = "id" | "currencyCode" | "isActive" | "createdAt" | "updatedAt";
export type AppTicketCreationAttributes = Optional<AppTicketAttributes, AppTicketOptionalAttributes>;

export class AppTicket extends Model<AppTicketAttributes, AppTicketCreationAttributes> implements AppTicketAttributes {
  id!: number;
  ticketId!: number;
  ticketTypeId!: number;
  ticketPrice!: number;
  currencyCode?: string;
  isActive!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppTicket belongsTo AppCountry via currencyCode
  currencyCodeAppCountry!: AppCountry;
  getCurrencyCodeAppCountry!: Sequelize.BelongsToGetAssociationMixin<AppCountry>;
  setCurrencyCodeAppCountry!: Sequelize.BelongsToSetAssociationMixin<AppCountry, AppCountryId>;
  createCurrencyCodeAppCountry!: Sequelize.BelongsToCreateAssociationMixin<AppCountry>;
  // AppTicket hasMany AppTrip via ticketId
  appTrips!: AppTrip[];
  getAppTrips!: Sequelize.HasManyGetAssociationsMixin<AppTrip>;
  setAppTrips!: Sequelize.HasManySetAssociationsMixin<AppTrip, AppTripId>;
  addAppTrip!: Sequelize.HasManyAddAssociationMixin<AppTrip, AppTripId>;
  addAppTrips!: Sequelize.HasManyAddAssociationsMixin<AppTrip, AppTripId>;
  createAppTrip!: Sequelize.HasManyCreateAssociationMixin<AppTrip>;
  removeAppTrip!: Sequelize.HasManyRemoveAssociationMixin<AppTrip, AppTripId>;
  removeAppTrips!: Sequelize.HasManyRemoveAssociationsMixin<AppTrip, AppTripId>;
  hasAppTrip!: Sequelize.HasManyHasAssociationMixin<AppTrip, AppTripId>;
  hasAppTrips!: Sequelize.HasManyHasAssociationsMixin<AppTrip, AppTripId>;
  countAppTrips!: Sequelize.HasManyCountAssociationsMixin;
  // AppTicket hasMany BookingTripTicket via ticketTypeId
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
  // AppTicket belongsTo TicketType via ticketTypeId
  ticketType!: TicketType;
  getTicketType!: Sequelize.BelongsToGetAssociationMixin<TicketType>;
  setTicketType!: Sequelize.BelongsToSetAssociationMixin<TicketType, TicketTypeId>;
  createTicketType!: Sequelize.BelongsToCreateAssociationMixin<TicketType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppTicket {
    return sequelize.define('AppTicket', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ticket_id'
    },
    ticketTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ticket_types',
        key: 'ticket_type_id'
      },
      field: 'ticket_type_id'
    },
    ticketPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'ticket_price'
    },
    currencyCode: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'app_countries',
        key: 'currency_code'
      },
      field: 'currency_code'
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
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
    tableName: 'app_tickets',
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
        name: "ticket_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
          { name: "ticket_type_id" },
        ]
      },
      {
        name: "currency_code",
        using: "BTREE",
        fields: [
          { name: "currency_code" },
        ]
      },
      {
        name: "ticket_type_id",
        using: "BTREE",
        fields: [
          { name: "ticket_type_id" },
        ]
      },
    ]
  }) as typeof AppTicket;
  }
}
