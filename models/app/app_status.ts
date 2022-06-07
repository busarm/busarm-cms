import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBooking, AppBookingId } from './app_booking';
import type { AppTransaction, AppTransactionId } from './app_transaction';
import type { AppTrip, AppTripId } from './app_trip';
import type { StatusType, StatusTypeId } from './status_type';

export interface AppStatusAttributes {
  statusId: number;
  status: string;
  typeId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppStatusPk = "statusId";
export type AppStatusId = AppStatus[AppStatusPk];
export type AppStatusOptionalAttributes = "createdAt" | "updatedAt";
export type AppStatusCreationAttributes = Optional<AppStatusAttributes, AppStatusOptionalAttributes>;

export class AppStatus extends Model<AppStatusAttributes, AppStatusCreationAttributes> implements AppStatusAttributes {
  statusId!: number;
  status!: string;
  typeId!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppStatus hasMany AppBooking via statusId
  appBookings!: AppBooking[];
  getAppBookings!: Sequelize.HasManyGetAssociationsMixin<AppBooking>;
  setAppBookings!: Sequelize.HasManySetAssociationsMixin<AppBooking, AppBookingId>;
  addAppBooking!: Sequelize.HasManyAddAssociationMixin<AppBooking, AppBookingId>;
  addAppBookings!: Sequelize.HasManyAddAssociationsMixin<AppBooking, AppBookingId>;
  createAppBooking!: Sequelize.HasManyCreateAssociationMixin<AppBooking>;
  removeAppBooking!: Sequelize.HasManyRemoveAssociationMixin<AppBooking, AppBookingId>;
  removeAppBookings!: Sequelize.HasManyRemoveAssociationsMixin<AppBooking, AppBookingId>;
  hasAppBooking!: Sequelize.HasManyHasAssociationMixin<AppBooking, AppBookingId>;
  hasAppBookings!: Sequelize.HasManyHasAssociationsMixin<AppBooking, AppBookingId>;
  countAppBookings!: Sequelize.HasManyCountAssociationsMixin;
  // AppStatus hasMany AppTransaction via statusId
  appTransactions!: AppTransaction[];
  getAppTransactions!: Sequelize.HasManyGetAssociationsMixin<AppTransaction>;
  setAppTransactions!: Sequelize.HasManySetAssociationsMixin<AppTransaction, AppTransactionId>;
  addAppTransaction!: Sequelize.HasManyAddAssociationMixin<AppTransaction, AppTransactionId>;
  addAppTransactions!: Sequelize.HasManyAddAssociationsMixin<AppTransaction, AppTransactionId>;
  createAppTransaction!: Sequelize.HasManyCreateAssociationMixin<AppTransaction>;
  removeAppTransaction!: Sequelize.HasManyRemoveAssociationMixin<AppTransaction, AppTransactionId>;
  removeAppTransactions!: Sequelize.HasManyRemoveAssociationsMixin<AppTransaction, AppTransactionId>;
  hasAppTransaction!: Sequelize.HasManyHasAssociationMixin<AppTransaction, AppTransactionId>;
  hasAppTransactions!: Sequelize.HasManyHasAssociationsMixin<AppTransaction, AppTransactionId>;
  countAppTransactions!: Sequelize.HasManyCountAssociationsMixin;
  // AppStatus hasMany AppTrip via statusId
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
  // AppStatus belongsTo StatusType via typeId
  type!: StatusType;
  getType!: Sequelize.BelongsToGetAssociationMixin<StatusType>;
  setType!: Sequelize.BelongsToSetAssociationMixin<StatusType, StatusTypeId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<StatusType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppStatus {
    return sequelize.define('AppStatus', {
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'status_id'
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status_type',
        key: 'type_id'
      },
      field: 'type_id'
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
    tableName: 'app_status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  }) as typeof AppStatus;
  }
}
