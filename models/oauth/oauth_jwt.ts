import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthClient, OauthClientId } from './oauth_client';

export interface OauthJwtAttributes {
  clientId: string;
  subject?: string;
  publicKey: string;
}

export type OauthJwtPk = "clientId";
export type OauthJwtId = OauthJwt[OauthJwtPk];
export type OauthJwtOptionalAttributes = "subject";
export type OauthJwtCreationAttributes = Optional<OauthJwtAttributes, OauthJwtOptionalAttributes>;

export class OauthJwt extends Model<OauthJwtAttributes, OauthJwtCreationAttributes> implements OauthJwtAttributes {
  clientId!: string;
  subject?: string;
  publicKey!: string;

  // OauthJwt belongsTo OauthClient via clientId
  client!: OauthClient;
  getClient!: Sequelize.BelongsToGetAssociationMixin<OauthClient>;
  setClient!: Sequelize.BelongsToSetAssociationMixin<OauthClient, OauthClientId>;
  createClient!: Sequelize.BelongsToCreateAssociationMixin<OauthClient>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthJwt {
    return sequelize.define('OauthJwt', {
    clientId: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'oauth_clients',
        key: 'client_id'
      },
      field: 'client_id'
    },
    subject: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    publicKey: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      field: 'public_key'
    }
  }, {
    tableName: 'oauth_jwt',
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
    ]
  }) as typeof OauthJwt;
  }
}
