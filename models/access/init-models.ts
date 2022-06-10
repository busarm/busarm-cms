import type { Sequelize } from "sequelize";
import { AccessCredential as _AccessCredential } from "./access_credential";
import type { AccessCredentialAttributes, AccessCredentialCreationAttributes } from "./access_credential";
import { AccessLog as _AccessLog } from "./access_log";
import type { AccessLogAttributes, AccessLogCreationAttributes } from "./access_log";
import { LogDevice as _LogDevice } from "./log_device";
import type { LogDeviceAttributes, LogDeviceCreationAttributes } from "./log_device";
import { LogSession as _LogSession } from "./log_session";
import type { LogSessionAttributes, LogSessionCreationAttributes } from "./log_session";
import { Migration as _Migration } from "./migration";
import type { MigrationAttributes, MigrationCreationAttributes } from "./migration";

export {
  _AccessCredential as AccessCredential,
  _AccessLog as AccessLog,
  _LogDevice as LogDevice,
  _LogSession as LogSession,
  _Migration as Migration,
};

export type {
  AccessCredentialAttributes,
  AccessCredentialCreationAttributes,
  AccessLogAttributes,
  AccessLogCreationAttributes,
  LogDeviceAttributes,
  LogDeviceCreationAttributes,
  LogSessionAttributes,
  LogSessionCreationAttributes,
  MigrationAttributes,
  MigrationCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AccessCredential = _AccessCredential.initModel(sequelize);
  const AccessLog = _AccessLog.initModel(sequelize);
  const LogDevice = _LogDevice.initModel(sequelize);
  const LogSession = _LogSession.initModel(sequelize);
  const Migration = _Migration.initModel(sequelize);

  LogDevice.belongsTo(AccessLog, { foreignKey: "accessId"});
  AccessLog.hasOne(LogDevice, { foreignKey: "accessId"});
  LogSession.belongsTo(AccessLog, { foreignKey: "accessId"});
  AccessLog.hasMany(LogSession, { foreignKey: "accessId"});

  return {
    AccessCredential: AccessCredential,
    AccessLog: AccessLog,
    LogDevice: LogDevice,
    LogSession: LogSession,
    Migration: Migration,
  };
}
