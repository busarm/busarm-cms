import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OauthClient, OauthClientId } from './oauth_client';

export interface OauthOrganizationAttributes {
  orgId: number;
  orgName?: string;
  dateCreated?: Date;
  logo?: string;
}

export type OauthOrganizationPk = "orgId";
export type OauthOrganizationId = OauthOrganization[OauthOrganizationPk];
export type OauthOrganizationOptionalAttributes = "orgId" | "orgName" | "dateCreated" | "logo";
export type OauthOrganizationCreationAttributes = Optional<OauthOrganizationAttributes, OauthOrganizationOptionalAttributes>;

export class OauthOrganization extends Model<OauthOrganizationAttributes, OauthOrganizationCreationAttributes> implements OauthOrganizationAttributes {
  orgId!: number;
  orgName?: string;
  dateCreated?: Date;
  logo?: string;

  // OauthOrganization hasMany OauthClient via orgId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof OauthOrganization {
    return sequelize.define('OauthOrganization', {
    orgId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'org_id'
    },
    orgName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'org_name'
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date_created'
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'oauth_organizations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
    ]
  }) as typeof OauthOrganization;
  }
}
