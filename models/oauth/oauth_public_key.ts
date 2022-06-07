import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthClient, OauthClientId } from './oauth_client';

export interface OauthPublicKeyAttributes {
  clientId: string;
  publicKey?: string;
  privateKey?: string;
  encryptionAlgorithm?: string;
}

export type OauthPublicKeyPk = "clientId";
export type OauthPublicKeyId = OauthPublicKey[OauthPublicKeyPk];
export type OauthPublicKeyOptionalAttributes = "publicKey" | "privateKey" | "encryptionAlgorithm";
export type OauthPublicKeyCreationAttributes = Optional<OauthPublicKeyAttributes, OauthPublicKeyOptionalAttributes>;

export class OauthPublicKey extends Model<OauthPublicKeyAttributes, OauthPublicKeyCreationAttributes> implements OauthPublicKeyAttributes {
  clientId!: string;
  publicKey?: string;
  privateKey?: string;
  encryptionAlgorithm?: string;

  // OauthPublicKey belongsTo OauthClient via clientId
  client!: OauthClient;
  getClient!: Sequelize.BelongsToGetAssociationMixin<OauthClient>;
  setClient!: Sequelize.BelongsToSetAssociationMixin<OauthClient, OauthClientId>;
  createClient!: Sequelize.BelongsToCreateAssociationMixin<OauthClient>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthPublicKey {
    return sequelize.define('OauthPublicKey', {
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
    publicKey: {
      type: DataTypes.STRING(4096),
      allowNull: true,
      field: 'public_key'
    },
    privateKey: {
      type: DataTypes.STRING(4096),
      allowNull: true,
      field: 'private_key'
    },
    encryptionAlgorithm: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "RS256",
      field: 'encryption_algorithm'
    }
  }, {
    tableName: 'oauth_public_keys',
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
  }) as typeof OauthPublicKey;
  }
}
