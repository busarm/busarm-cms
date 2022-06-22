import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OauthJtiAttributes {
  id: number;
  issuer: string;
  subject?: string;
  audiance?: string;
  expires: Date;
  jti: string;
}

export type OauthJtiPk = "id";
export type OauthJtiId = OauthJti[OauthJtiPk];
export type OauthJtiOptionalAttributes = "id" | "subject" | "audiance";
export type OauthJtiCreationAttributes = Optional<OauthJtiAttributes, OauthJtiOptionalAttributes>;

export class OauthJti extends Model<OauthJtiAttributes, OauthJtiCreationAttributes> implements OauthJtiAttributes {
  id!: number;
  issuer!: string;
  subject?: string;
  audiance?: string;
  expires!: Date;
  jti!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof OauthJti {
    return sequelize.define('OauthJti', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    issuer: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    audiance: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    jti: {
      type: DataTypes.STRING(2000),
      allowNull: false
    }
  }, {
    tableName: 'oauth_jti',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof OauthJti;
  }
}
