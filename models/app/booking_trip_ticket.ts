import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppTicket, AppTicketId } from './app_ticket';

export interface BookingTripTicketAttributes {
  id: number;
  bookingId: string;
  ticketId: number;
  qty: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type BookingTripTicketPk = "id";
export type BookingTripTicketId = BookingTripTicket[BookingTripTicketPk];
export type BookingTripTicketOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type BookingTripTicketCreationAttributes = Optional<BookingTripTicketAttributes, BookingTripTicketOptionalAttributes>;

export class BookingTripTicket extends Model<BookingTripTicketAttributes, BookingTripTicketCreationAttributes> implements BookingTripTicketAttributes {
  id!: number;
  bookingId!: string;
  ticketId!: number;
  qty!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // BookingTripTicket belongsTo AppBooking via bookingId
  booking!: AppBooking;
  getBooking!: Sequelize.BelongsToGetAssociationMixin<AppBooking>;
  setBooking!: Sequelize.BelongsToSetAssociationMixin<AppBooking, AppBookingId>;
  createBooking!: Sequelize.BelongsToCreateAssociationMixin<AppBooking>;
  // BookingTripTicket belongsTo AppTicket via ticketId
  ticket!: AppTicket;
  getTicket!: Sequelize.BelongsToGetAssociationMixin<AppTicket>;
  setTicket!: Sequelize.BelongsToSetAssociationMixin<AppTicket, AppTicketId>;
  createTicket!: Sequelize.BelongsToCreateAssociationMixin<AppTicket>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BookingTripTicket {
    return sequelize.define('BookingTripTicket', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bookingId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'app_booking',
        key: 'booking_id'
      },
      field: 'booking_id'
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_tickets',
        key: 'id'
      },
      field: 'ticket_id'
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'booking_trip_tickets',
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
        name: "booking_id_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "booking_id" },
          { name: "ticket_id" },
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
        name: "ticket_id",
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
    ]
  }) as typeof BookingTripTicket;
  }
}
