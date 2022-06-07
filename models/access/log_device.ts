import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AccessLog, AccessLogId } from './access_log';

export interface LogDeviceAttributes {
  accessId: number;
  deviceType: string;
  accessAgent: string;
  deviceBrand: string;
  deviceOs: string;
  appName: string;
  appVersion: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type LogDevicePk = "accessId";
export type LogDeviceId = LogDevice[LogDevicePk];
export type LogDeviceOptionalAttributes = "createdAt" | "updatedAt";
export type LogDeviceCreationAttributes = Optional<LogDeviceAttributes, LogDeviceOptionalAttributes>;

export class LogDevice extends Model<LogDeviceAttributes, LogDeviceCreationAttributes> implements LogDeviceAttributes {
  accessId!: number;
  deviceType!: string;
  accessAgent!: string;
  deviceBrand!: string;
  deviceOs!: string;
  appName!: string;
  appVersion!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // LogDevice belongsTo AccessLog via accessId
  access!: AccessLog;
  getAccess!: Sequelize.BelongsToGetAssociationMixin<AccessLog>;
  setAccess!: Sequelize.BelongsToSetAssociationMixin<AccessLog, AccessLogId>;
  createAccess!: Sequelize.BelongsToCreateAssociationMixin<AccessLog>;

  static initModel(sequelize: Sequelize.Sequelize): typeof LogDevice {
    return sequelize.define('LogDevice', {
    accessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'access_log',
        key: 'access_id'
      },
      field: 'access_id'
    },
    deviceType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'device_type'
    },
    accessAgent: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'access_agent'
    },
    deviceBrand: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'device_brand'
    },
    deviceOs: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'device_os'
    },
    appName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'app_name'
    },
    appVersion: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'app_version'
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
    tableName: 'log_devices',
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
    ]
  }) as typeof LogDevice;
  }
}
