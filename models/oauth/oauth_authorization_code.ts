import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthClient, OauthClientId } from './oauth_client';
import type { OauthUser, OauthUserId } from './oauth_user';

export interface OauthAuthorizationCodeAttributes {
  authorizationCode: string;
  clientId: string;
  userId?: string;
  redirectUri?: string;
  expires: Date;
  scope?: string;
  idToken?: string;
}

export type OauthAuthorizationCodePk = "authorizationCode";
export type OauthAuthorizationCodeId = OauthAuthorizationCode[OauthAuthorizationCodePk];
export type OauthAuthorizationCodeOptionalAttributes = "userId" | "redirectUri" | "expires" | "scope" | "idToken";
export type OauthAuthorizationCodeCreationAttributes = Optional<OauthAuthorizationCodeAttributes, OauthAuthorizationCodeOptionalAttributes>;

export class OauthAuthorizationCode extends Model<OauthAuthorizationCodeAttributes, OauthAuthorizationCodeCreationAttributes> implements OauthAuthorizationCodeAttributes {
  authorizationCode!: string;
  clientId!: string;
  userId?: string;
  redirectUri?: string;
  expires!: Date;
  scope?: string;
  idToken?: string;

  // OauthAuthorizationCode belongsTo OauthClient via clientId
  client!: OauthClient;
  getClient!: Sequelize.BelongsToGetAssociationMixin<OauthClient>;
  setClient!: Sequelize.BelongsToSetAssociationMixin<OauthClient, OauthClientId>;
  createClient!: Sequelize.BelongsToCreateAssociationMixin<OauthClient>;
  // OauthAuthorizationCode belongsTo OauthUser via userId
  user!: OauthUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<OauthUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<OauthUser, OauthUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<OauthUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthAuthorizationCode {
    return sequelize.define('OauthAuthorizationCode', {
    authorizationCode: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
      field: 'authorization_code'
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
    redirectUri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'redirect_uri'
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
    idToken: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'id_token'
    }
  }, {
    tableName: 'oauth_authorization_codes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "authorization_code" },
        ]
      },
      {
        name: "authorization_client_fk_idx",
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "authorization_user_fk_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof OauthAuthorizationCode;
  }
}
