import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OauthJtiAttributes {
  issuer: string;
  subject?: string;
  audiance?: string;
  expires: Date;
  jti: string;
}

export type OauthJtiOptionalAttributes = "subject" | "audiance";
export type OauthJtiCreationAttributes = Optional<OauthJtiAttributes, OauthJtiOptionalAttributes>;

export class OauthJti extends Model<OauthJtiAttributes, OauthJtiCreationAttributes> implements OauthJtiAttributes {
  issuer!: string;
  subject?: string;
  audiance?: string;
  expires!: Date;
  jti!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof OauthJti {
    return sequelize.define('OauthJti', {
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
    timestamps: false
  }) as typeof OauthJti;
  }
}
