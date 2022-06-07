import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthAccessToken, OauthAccessTokenId } from './oauth_access_token';
import type { OauthAuthorizationCode, OauthAuthorizationCodeId } from './oauth_authorization_code';
import type { OauthJwt, OauthJwtCreationAttributes, OauthJwtId } from './oauth_jwt';
import type { OauthOrganization, OauthOrganizationId } from './oauth_organization';
import type { OauthPublicKey, OauthPublicKeyCreationAttributes, OauthPublicKeyId } from './oauth_public_key';
import type { OauthRefreshToken, OauthRefreshTokenId } from './oauth_refresh_token';
import type { OauthUser, OauthUserId } from './oauth_user';

export interface OauthClientAttributes {
  clientId: string;
  clientName?: string;
  clientSecret?: string;
  orgId: number;
  redirectUri?: string;
  grantTypes?: string;
  scope?: string;
  userId?: string;
  dateCreated: Date;
  issueJwt: number;
}

export type OauthClientPk = "clientId";
export type OauthClientId = OauthClient[OauthClientPk];
export type OauthClientOptionalAttributes = "clientName" | "clientSecret" | "redirectUri" | "grantTypes" | "scope" | "userId" | "dateCreated" | "issueJwt";
export type OauthClientCreationAttributes = Optional<OauthClientAttributes, OauthClientOptionalAttributes>;

export class OauthClient extends Model<OauthClientAttributes, OauthClientCreationAttributes> implements OauthClientAttributes {
  clientId!: string;
  clientName?: string;
  clientSecret?: string;
  orgId!: number;
  redirectUri?: string;
  grantTypes?: string;
  scope?: string;
  userId?: string;
  dateCreated!: Date;
  issueJwt!: number;

  // OauthClient hasMany OauthAccessToken via clientId
  oauthAccessTokens!: OauthAccessToken[];
  getOauthAccessTokens!: Sequelize.HasManyGetAssociationsMixin<OauthAccessToken>;
  setOauthAccessTokens!: Sequelize.HasManySetAssociationsMixin<OauthAccessToken, OauthAccessTokenId>;
  addOauthAccessToken!: Sequelize.HasManyAddAssociationMixin<OauthAccessToken, OauthAccessTokenId>;
  addOauthAccessTokens!: Sequelize.HasManyAddAssociationsMixin<OauthAccessToken, OauthAccessTokenId>;
  createOauthAccessToken!: Sequelize.HasManyCreateAssociationMixin<OauthAccessToken>;
  removeOauthAccessToken!: Sequelize.HasManyRemoveAssociationMixin<OauthAccessToken, OauthAccessTokenId>;
  removeOauthAccessTokens!: Sequelize.HasManyRemoveAssociationsMixin<OauthAccessToken, OauthAccessTokenId>;
  hasOauthAccessToken!: Sequelize.HasManyHasAssociationMixin<OauthAccessToken, OauthAccessTokenId>;
  hasOauthAccessTokens!: Sequelize.HasManyHasAssociationsMixin<OauthAccessToken, OauthAccessTokenId>;
  countOauthAccessTokens!: Sequelize.HasManyCountAssociationsMixin;
  // OauthClient hasMany OauthAuthorizationCode via clientId
  oauthAuthorizationCodes!: OauthAuthorizationCode[];
  getOauthAuthorizationCodes!: Sequelize.HasManyGetAssociationsMixin<OauthAuthorizationCode>;
  setOauthAuthorizationCodes!: Sequelize.HasManySetAssociationsMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  addOauthAuthorizationCode!: Sequelize.HasManyAddAssociationMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  addOauthAuthorizationCodes!: Sequelize.HasManyAddAssociationsMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  createOauthAuthorizationCode!: Sequelize.HasManyCreateAssociationMixin<OauthAuthorizationCode>;
  removeOauthAuthorizationCode!: Sequelize.HasManyRemoveAssociationMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  removeOauthAuthorizationCodes!: Sequelize.HasManyRemoveAssociationsMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  hasOauthAuthorizationCode!: Sequelize.HasManyHasAssociationMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  hasOauthAuthorizationCodes!: Sequelize.HasManyHasAssociationsMixin<OauthAuthorizationCode, OauthAuthorizationCodeId>;
  countOauthAuthorizationCodes!: Sequelize.HasManyCountAssociationsMixin;
  // OauthClient hasOne OauthJwt via clientId
  oauthJwt!: OauthJwt;
  getOauthJwt!: Sequelize.HasOneGetAssociationMixin<OauthJwt>;
  setOauthJwt!: Sequelize.HasOneSetAssociationMixin<OauthJwt, OauthJwtId>;
  createOauthJwt!: Sequelize.HasOneCreateAssociationMixin<OauthJwt>;
  // OauthClient hasOne OauthPublicKey via clientId
  oauthPublicKey!: OauthPublicKey;
  getOauthPublicKey!: Sequelize.HasOneGetAssociationMixin<OauthPublicKey>;
  setOauthPublicKey!: Sequelize.HasOneSetAssociationMixin<OauthPublicKey, OauthPublicKeyId>;
  createOauthPublicKey!: Sequelize.HasOneCreateAssociationMixin<OauthPublicKey>;
  // OauthClient hasMany OauthRefreshToken via clientId
  oauthRefreshTokens!: OauthRefreshToken[];
  getOauthRefreshTokens!: Sequelize.HasManyGetAssociationsMixin<OauthRefreshToken>;
  setOauthRefreshTokens!: Sequelize.HasManySetAssociationsMixin<OauthRefreshToken, OauthRefreshTokenId>;
  addOauthRefreshToken!: Sequelize.HasManyAddAssociationMixin<OauthRefreshToken, OauthRefreshTokenId>;
  addOauthRefreshTokens!: Sequelize.HasManyAddAssociationsMixin<OauthRefreshToken, OauthRefreshTokenId>;
  createOauthRefreshToken!: Sequelize.HasManyCreateAssociationMixin<OauthRefreshToken>;
  removeOauthRefreshToken!: Sequelize.HasManyRemoveAssociationMixin<OauthRefreshToken, OauthRefreshTokenId>;
  removeOauthRefreshTokens!: Sequelize.HasManyRemoveAssociationsMixin<OauthRefreshToken, OauthRefreshTokenId>;
  hasOauthRefreshToken!: Sequelize.HasManyHasAssociationMixin<OauthRefreshToken, OauthRefreshTokenId>;
  hasOauthRefreshTokens!: Sequelize.HasManyHasAssociationsMixin<OauthRefreshToken, OauthRefreshTokenId>;
  countOauthRefreshTokens!: Sequelize.HasManyCountAssociationsMixin;
  // OauthClient belongsTo OauthOrganization via orgId
  org!: OauthOrganization;
  getOrg!: Sequelize.BelongsToGetAssociationMixin<OauthOrganization>;
  setOrg!: Sequelize.BelongsToSetAssociationMixin<OauthOrganization, OauthOrganizationId>;
  createOrg!: Sequelize.BelongsToCreateAssociationMixin<OauthOrganization>;
  // OauthClient belongsTo OauthUser via userId
  user!: OauthUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<OauthUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<OauthUser, OauthUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<OauthUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthClient {
    return sequelize.define('OauthClient', {
    clientId: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      field: 'client_id'
    },
    clientName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'client_name'
    },
    clientSecret: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'client_secret'
    },
    orgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'oauth_organizations',
        key: 'org_id'
      },
      field: 'org_id'
    },
    redirectUri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'redirect_uri'
    },
    grantTypes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'grant_types'
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.STRING(256),
      allowNull: true,
      references: {
        model: 'oauth_users',
        key: 'user_id'
      },
      field: 'user_id'
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date_created'
    },
    issueJwt: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'issue_jwt'
    }
  }, {
    tableName: 'oauth_clients',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "client_user_fk_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "client_org_fk_idx",
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
    ]
  }) as typeof OauthClient;
  }
}
