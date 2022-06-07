import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthClient, OauthClientId } from './oauth_client';
import type { OauthUser, OauthUserId } from './oauth_user';

export interface OauthRefreshTokenAttributes {
  refreshToken: string;
  clientId: string;
  userId?: string;
  expires: Date;
  scope?: string;
}

export type OauthRefreshTokenPk = "refreshToken";
export type OauthRefreshTokenId = OauthRefreshToken[OauthRefreshTokenPk];
export type OauthRefreshTokenOptionalAttributes = "userId" | "expires" | "scope";
export type OauthRefreshTokenCreationAttributes = Optional<OauthRefreshTokenAttributes, OauthRefreshTokenOptionalAttributes>;

export class OauthRefreshToken extends Model<OauthRefreshTokenAttributes, OauthRefreshTokenCreationAttributes> implements OauthRefreshTokenAttributes {
  refreshToken!: string;
  clientId!: string;
  userId?: string;
  expires!: Date;
  scope?: string;

  // OauthRefreshToken belongsTo OauthClient via clientId
  client!: OauthClient;
  getClient!: Sequelize.BelongsToGetAssociationMixin<OauthClient>;
  setClient!: Sequelize.BelongsToSetAssociationMixin<OauthClient, OauthClientId>;
  createClient!: Sequelize.BelongsToCreateAssociationMixin<OauthClient>;
  // OauthRefreshToken belongsTo OauthUser via userId
  user!: OauthUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<OauthUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<OauthUser, OauthUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<OauthUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthRefreshToken {
    return sequelize.define('OauthRefreshToken', {
    refreshToken: {
      type: DataTypes.STRING(512),
      allowNull: false,
      primaryKey: true,
      field: 'refresh_token'
    },
    clientId: {
      type: DataTypes.STRING(256),
      allowNull: false,
      references: {
        model: 'oauth_clients',
        key: 'client_id'
      },
      field: 'client_id'
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
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'oauth_refresh_tokens',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "refresh_token" },
        ]
      },
      {
        name: "refresh_client_fk_idx",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "refresh_user_fk_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof OauthRefreshToken;
  }
}
