import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AccessLog, AccessLogId } from './access_log';

export interface LogSessionAttributes {
  id: number;
  accessId: number;
  sessionKey: string;
  sessionValue?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type LogSessionPk = "id";
export type LogSessionId = LogSession[LogSessionPk];
export type LogSessionOptionalAttributes = "id" | "sessionValue" | "createdAt" | "updatedAt";
export type LogSessionCreationAttributes = Optional<LogSessionAttributes, LogSessionOptionalAttributes>;

export class LogSession extends Model<LogSessionAttributes, LogSessionCreationAttributes> implements LogSessionAttributes {
  id!: number;
  accessId!: number;
  sessionKey!: string;
  sessionValue?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // LogSession belongsTo AccessLog via accessId
  access!: AccessLog;
  getAccess!: Sequelize.BelongsToGetAssociationMixin<AccessLog>;
  setAccess!: Sequelize.BelongsToSetAssociationMixin<AccessLog, AccessLogId>;
  createAccess!: Sequelize.BelongsToCreateAssociationMixin<AccessLog>;

  static initModel(sequelize: Sequelize.Sequelize): typeof LogSession {
    return sequelize.define('LogSession', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    accessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'access_log',
        key: 'access_id'
      },
      field: 'access_id'
    },
    sessionKey: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'session_key'
    },
    sessionValue: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'session_value'
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
    tableName: 'log_session',
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
        name: "access_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "access_id" },
          { name: "session_key" },
        ]
      },
    ]
  }) as typeof LogSession;
  }
}
