import type { Sequelize } from "sequelize";
import { Migration as _Migration } from "./migration";
import type { MigrationAttributes, MigrationCreationAttributes } from "./migration";
import { OauthAccessToken as _OauthAccessToken } from "./oauth_access_token";
import type { OauthAccessTokenAttributes, OauthAccessTokenCreationAttributes } from "./oauth_access_token";
import { OauthAuthorizationCode as _OauthAuthorizationCode } from "./oauth_authorization_code";
import type { OauthAuthorizationCodeAttributes, OauthAuthorizationCodeCreationAttributes } from "./oauth_authorization_code";
import { OauthClient as _OauthClient } from "./oauth_client";
import type { OauthClientAttributes, OauthClientCreationAttributes } from "./oauth_client";
import { OauthJti as _OauthJti } from "./oauth_jti";
import type { OauthJtiAttributes, OauthJtiCreationAttributes } from "./oauth_jti";
import { OauthJwt as _OauthJwt } from "./oauth_jwt";
import type { OauthJwtAttributes, OauthJwtCreationAttributes } from "./oauth_jwt";
import { OauthOrganization as _OauthOrganization } from "./oauth_organization";
import type { OauthOrganizationAttributes, OauthOrganizationCreationAttributes } from "./oauth_organization";
import { OauthPublicKey as _OauthPublicKey } from "./oauth_public_key";
import type { OauthPublicKeyAttributes, OauthPublicKeyCreationAttributes } from "./oauth_public_key";
import { OauthRefreshToken as _OauthRefreshToken } from "./oauth_refresh_token";
import type { OauthRefreshTokenAttributes, OauthRefreshTokenCreationAttributes } from "./oauth_refresh_token";
import { OauthScope as _OauthScope } from "./oauth_scope";
import type { OauthScopeAttributes, OauthScopeCreationAttributes } from "./oauth_scope";
import { OauthUser as _OauthUser } from "./oauth_user";
import type { OauthUserAttributes, OauthUserCreationAttributes } from "./oauth_user";

export {
  _Migration as Migration,
  _OauthAccessToken as OauthAccessToken,
  _OauthAuthorizationCode as OauthAuthorizationCode,
  _OauthClient as OauthClient,
  _OauthJti as OauthJti,
  _OauthJwt as OauthJwt,
  _OauthOrganization as OauthOrganization,
  _OauthPublicKey as OauthPublicKey,
  _OauthRefreshToken as OauthRefreshToken,
  _OauthScope as OauthScope,
  _OauthUser as OauthUser,
};

export type {
  MigrationAttributes,
  MigrationCreationAttributes,
  OauthAccessTokenAttributes,
  OauthAccessTokenCreationAttributes,
  OauthAuthorizationCodeAttributes,
  OauthAuthorizationCodeCreationAttributes,
  OauthClientAttributes,
  OauthClientCreationAttributes,
  OauthJtiAttributes,
  OauthJtiCreationAttributes,
  OauthJwtAttributes,
  OauthJwtCreationAttributes,
  OauthOrganizationAttributes,
  OauthOrganizationCreationAttributes,
  OauthPublicKeyAttributes,
  OauthPublicKeyCreationAttributes,
  OauthRefreshTokenAttributes,
  OauthRefreshTokenCreationAttributes,
  OauthScopeAttributes,
  OauthScopeCreationAttributes,
  OauthUserAttributes,
  OauthUserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Migration = _Migration.initModel(sequelize);
  const OauthAccessToken = _OauthAccessToken.initModel(sequelize);
  const OauthAuthorizationCode = _OauthAuthorizationCode.initModel(sequelize);
  const OauthClient = _OauthClient.initModel(sequelize);
  const OauthJti = _OauthJti.initModel(sequelize);
  const OauthJwt = _OauthJwt.initModel(sequelize);
  const OauthOrganization = _OauthOrganization.initModel(sequelize);
  const OauthPublicKey = _OauthPublicKey.initModel(sequelize);
  const OauthRefreshToken = _OauthRefreshToken.initModel(sequelize);
  const OauthScope = _OauthScope.initModel(sequelize);
  const OauthUser = _OauthUser.initModel(sequelize);

  OauthAccessToken.belongsTo(OauthClient, { foreignKey: "clientId"});
  OauthClient.hasMany(OauthAccessToken, { foreignKey: "clientId"});
  OauthAuthorizationCode.belongsTo(OauthClient, { foreignKey: "clientId"});
  OauthClient.hasMany(OauthAuthorizationCode, { foreignKey: "clientId"});
  OauthJwt.belongsTo(OauthClient, { foreignKey: "clientId"});
  OauthClient.hasOne(OauthJwt, { foreignKey: "clientId"});
  OauthPublicKey.belongsTo(OauthClient, { foreignKey: "clientId"});
  OauthClient.hasOne(OauthPublicKey, { foreignKey: "clientId"});
  OauthRefreshToken.belongsTo(OauthClient, { foreignKey: "clientId"});
  OauthClient.hasMany(OauthRefreshToken, { foreignKey: "clientId"});
  OauthClient.belongsTo(OauthOrganization, { foreignKey: "orgId"});
  OauthOrganization.hasMany(OauthClient, { foreignKey: "orgId"});
  OauthAccessToken.belongsTo(OauthUser, { foreignKey: "userId"});
  OauthUser.hasMany(OauthAccessToken, { foreignKey: "userId"});
  OauthAuthorizationCode.belongsTo(OauthUser, { foreignKey: "userId"});
  OauthUser.hasMany(OauthAuthorizationCode, { foreignKey: "userId"});
  OauthClient.belongsTo(OauthUser, { foreignKey: "userId"});
  OauthUser.hasMany(OauthClient, { foreignKey: "userId"});
  OauthRefreshToken.belongsTo(OauthUser, { foreignKey: "userId"});
  OauthUser.hasMany(OauthRefreshToken, { foreignKey: "userId"});

  return {
    Migration: Migration,
    OauthAccessToken: OauthAccessToken,
    OauthAuthorizationCode: OauthAuthorizationCode,
    OauthClient: OauthClient,
    OauthJti: OauthJti,
    OauthJwt: OauthJwt,
    OauthOrganization: OauthOrganization,
    OauthPublicKey: OauthPublicKey,
    OauthRefreshToken: OauthRefreshToken,
    OauthScope: OauthScope,
    OauthUser: OauthUser,
  };
}
