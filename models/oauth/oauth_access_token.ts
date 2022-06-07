import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthClient, OauthClientId } from './oauth_client';
import type { OauthUser, OauthUserId } from './oauth_user';

export interface OauthAccessTokenAttributes {
  accessToken: string;
  clientId: string;
  userId?: string;
  expires: Date;
  scope?: string;
  dateCreated: Date;
}

export type OauthAccessTokenPk = "accessToken";
export type OauthAccessTokenId = OauthAccessToken[OauthAccessTokenPk];
export type OauthAccessTokenOptionalAttributes = "userId" | "expires" | "scope" | "dateCreated";
export type OauthAccessTokenCreationAttributes = Optional<OauthAccessTokenAttributes, OauthAccessTokenOptionalAttributes>;

export class OauthAccessToken extends Model<OauthAccessTokenAttributes, OauthAccessTokenCreationAttributes> implements OauthAccessTokenAttributes {
  accessToken!: string;
  clientId!: string;
  userId?: string;
  expires!: Date;
  scope?: string;
  dateCreated!: Date;

  // OauthAccessToken belongsTo OauthClient via clientId
  client!: OauthClient;
  getClient!: Sequelize.BelongsToGetAssociationMixin<OauthClient>;
  setClient!: Sequelize.BelongsToSetAssociationMixin<OauthClient, OauthClientId>;
  createClient!: Sequelize.BelongsToCreateAssociationMixin<OauthClient>;
  // OauthAccessToken belongsTo OauthUser via userId
  user!: OauthUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<OauthUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<OauthUser, OauthUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<OauthUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthAccessToken {
    return sequelize.define('OauthAccessToken', {
    accessToken: {
      type: DataTypes.STRING(767),
      allowNull: false,
      primaryKey: true,
      field: 'access_token'
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
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date_created'
    }
  }, {
    tableName: 'oauth_access_tokens',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "access_token" },
        ]
      },
      {
        name: "token_client_fk_idx",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "token_user_fk_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof OauthAccessToken;
  }
}
