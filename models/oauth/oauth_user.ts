import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthAccessToken, OauthAccessTokenId } from './oauth_access_token';
import type { OauthAuthorizationCode, OauthAuthorizationCodeId } from './oauth_authorization_code';
import type { OauthClient, OauthClientId } from './oauth_client';
import type { OauthRefreshToken, OauthRefreshTokenId } from './oauth_refresh_token';

export interface OauthUserAttributes {
  userId: string;
  name?: string;
  email?: string;
  dialCode?: string;
  phone?: string;
  password?: string;
  salt?: string;
  scope: string;
  dateCreated: Date;
  credUpdatedAt?: Date;
}

export type OauthUserPk = "userId";
export type OauthUserId = OauthUser[OauthUserPk];
export type OauthUserOptionalAttributes = "name" | "email" | "dialCode" | "phone" | "password" | "salt" | "dateCreated" | "credUpdatedAt";
export type OauthUserCreationAttributes = Optional<OauthUserAttributes, OauthUserOptionalAttributes>;

export class OauthUser extends Model<OauthUserAttributes, OauthUserCreationAttributes> implements OauthUserAttributes {
  userId!: string;
  name?: string;
  email?: string;
  dialCode?: string;
  phone?: string;
  password?: string;
  salt?: string;
  scope!: string;
  dateCreated!: Date;
  credUpdatedAt?: Date;

  // OauthUser hasMany OauthAccessToken via userId
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
  // OauthUser hasMany OauthAuthorizationCode via userId
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
  // OauthUser hasMany OauthClient via userId
  oauthClients!: OauthClient[];
  getOauthClients!: Sequelize.HasManyGetAssociationsMixin<OauthClient>;
  setOauthClients!: Sequelize.HasManySetAssociationsMixin<OauthClient, OauthClientId>;
  addOauthClient!: Sequelize.HasManyAddAssociationMixin<OauthClient, OauthClientId>;
  addOauthClients!: Sequelize.HasManyAddAssociationsMixin<OauthClient, OauthClientId>;
  createOauthClient!: Sequelize.HasManyCreateAssociationMixin<OauthClient>;
  removeOauthClient!: Sequelize.HasManyRemoveAssociationMixin<OauthClient, OauthClientId>;
  removeOauthClients!: Sequelize.HasManyRemoveAssociationsMixin<OauthClient, OauthClientId>;
  hasOauthClient!: Sequelize.HasManyHasAssociationMixin<OauthClient, OauthClientId>;
  hasOauthClients!: Sequelize.HasManyHasAssociationsMixin<OauthClient, OauthClientId>;
  countOauthClients!: Sequelize.HasManyCountAssociationsMixin;
  // OauthUser hasMany OauthRefreshToken via userId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthUser {
    return sequelize.define('OauthUser', {
    userId: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true,
      unique: "email_UNIQUE"
    },
    dialCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'dial_code'
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date_created'
    },
    credUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'cred_updated_at'
    }
  }, {
    tableName: 'oauth_users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  }) as typeof OauthUser;
  }
}
