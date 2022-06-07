import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MigrationAttributes {
  version: number;
  migrationName?: string;
  startTime?: Date;
  endTime?: Date;
  breakpoint: number;
}

export type MigrationPk = "version";
export type MigrationId = Migration[MigrationPk];
export type MigrationOptionalAttributes = "migrationName" | "startTime" | "endTime" | "breakpoint";
export type MigrationCreationAttributes = Optional<MigrationAttributes, MigrationOptionalAttributes>;

export class Migration extends Model<MigrationAttributes, MigrationCreationAttributes> implements MigrationAttributes {
  version!: number;
  migrationName?: string;
  startTime?: Date;
  endTime?: Date;
  breakpoint!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Migration {
    return sequelize.define('Migration', {
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    migrationName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'migration_name'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_time'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_time'
    },
    breakpoint: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'migration',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "version" },
        ]
      },
    ]
  }) as typeof Migration;
  }
}
