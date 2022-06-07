import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AppConfigAttributes {
  name: string;
  value: string;
  isPrivate: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppConfigPk = "name";
export type AppConfigId = AppConfig[AppConfigPk];
export type AppConfigOptionalAttributes = "isPrivate" | "createdAt" | "updatedAt";
export type AppConfigCreationAttributes = Optional<AppConfigAttributes, AppConfigOptionalAttributes>;

export class AppConfig extends Model<AppConfigAttributes, AppConfigCreationAttributes> implements AppConfigAttributes {
  name!: string;
  value!: string;
  isPrivate!: number;
  createdAt!: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AppConfig {
    return sequelize.define('AppConfig', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isPrivate: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      field: 'is_private'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'app_configs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  }) as typeof AppConfig;
  }
}
