import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { LogDevice, LogDeviceCreationAttributes, LogDeviceId } from './log_device';
import type { LogSession, LogSessionId } from './log_session';

export interface AccessLogAttributes {
  accessId: number;
  sessionToken: string;
  ip: string;
  lat?: number;
  lng?: number;
  city?: string;
  region?: string;
  country?: string;
  timeZone?: string;
  lastAccess: Date;
  isLive: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AccessLogPk = "accessId";
export type AccessLogId = AccessLog[AccessLogPk];
export type AccessLogOptionalAttributes = "accessId" | "lat" | "lng" | "city" | "region" | "country" | "timeZone" | "isLive" | "createdAt" | "updatedAt";
export type AccessLogCreationAttributes = Optional<AccessLogAttributes, AccessLogOptionalAttributes>;

export class AccessLog extends Model<AccessLogAttributes, AccessLogCreationAttributes> implements AccessLogAttributes {
  accessId!: number;
  sessionToken!: string;
  ip!: string;
  lat?: number;
  lng?: number;
  city?: string;
  region?: string;
  country?: string;
  timeZone?: string;
  lastAccess!: Date;
  isLive!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AccessLog hasOne LogDevice via accessId
  logDevice!: LogDevice;
  getLogDevice!: Sequelize.HasOneGetAssociationMixin<LogDevice>;
  setLogDevice!: Sequelize.HasOneSetAssociationMixin<LogDevice, LogDeviceId>;
  createLogDevice!: Sequelize.HasOneCreateAssociationMixin<LogDevice>;
  // AccessLog hasMany LogSession via accessId
  logSessions!: LogSession[];
  getLogSessions!: Sequelize.HasManyGetAssociationsMixin<LogSession>;
  setLogSessions!: Sequelize.HasManySetAssociationsMixin<LogSession, LogSessionId>;
  addLogSession!: Sequelize.HasManyAddAssociationMixin<LogSession, LogSessionId>;
  addLogSessions!: Sequelize.HasManyAddAssociationsMixin<LogSession, LogSessionId>;
  createLogSession!: Sequelize.HasManyCreateAssociationMixin<LogSession>;
  removeLogSession!: Sequelize.HasManyRemoveAssociationMixin<LogSession, LogSessionId>;
  removeLogSessions!: Sequelize.HasManyRemoveAssociationsMixin<LogSession, LogSessionId>;
  hasLogSession!: Sequelize.HasManyHasAssociationMixin<LogSession, LogSessionId>;
  hasLogSessions!: Sequelize.HasManyHasAssociationsMixin<LogSession, LogSessionId>;
  countLogSessions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AccessLog {
    return sequelize.define('AccessLog', {
    accessId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'access_id'
    },
    sessionToken: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: "session_token",
      field: 'session_token'
    },
    ip: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    timeZone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'time_zone'
    },
    lastAccess: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'last_access'
    },
    isLive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'is_live'
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
    tableName: 'access_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "access_id" },
        ]
      },
      {
        name: "session_token",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "session_token" },
        ]
      },
    ]
  }) as typeof AccessLog;
  }
}
