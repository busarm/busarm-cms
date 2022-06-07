import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OauthScopeAttributes {
  scope: string;
  type?: string;
  description?: string;
  isDefault?: number;
}

export type OauthScopePk = "scope";
export type OauthScopeId = OauthScope[OauthScopePk];
export type OauthScopeOptionalAttributes = "type" | "description" | "isDefault";
export type OauthScopeCreationAttributes = Optional<OauthScopeAttributes, OauthScopeOptionalAttributes>;

export class OauthScope extends Model<OauthScopeAttributes, OauthScopeCreationAttributes> implements OauthScopeAttributes {
  scope!: string;
  type?: string;
  description?: string;
  isDefault?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof OauthScope {
    return sequelize.define('OauthScope', {
    scope: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      field: 'is_default'
    }
  }, {
    tableName: 'oauth_scopes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "scope" },
        ]
      },
    ]
  }) as typeof OauthScope;
  }
}
