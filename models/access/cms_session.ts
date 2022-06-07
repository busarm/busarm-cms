import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CmsSessionAttributes {
  sid: string;
  expires?: Date;
  data?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CmsSessionPk = "sid";
export type CmsSessionId = CmsSession[CmsSessionPk];
export type CmsSessionOptionalAttributes = "expires" | "data";
export type CmsSessionCreationAttributes = Optional<CmsSessionAttributes, CmsSessionOptionalAttributes>;

export class CmsSession extends Model<CmsSessionAttributes, CmsSessionCreationAttributes> implements CmsSessionAttributes {
  sid!: string;
  expires?: Date;
  data?: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof CmsSession {
    return sequelize.define('CmsSession', {
    sid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'cms_sessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sid" },
        ]
      },
    ]
  }) as typeof CmsSession;
  }
}
