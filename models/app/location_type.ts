import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppLocation, AppLocationId } from './app_location';

export interface LocationTypeAttributes {
  typeId: number;
  typeName: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type LocationTypePk = "typeId";
export type LocationTypeId = LocationType[LocationTypePk];
export type LocationTypeOptionalAttributes = "typeId" | "createdAt" | "updatedAt";
export type LocationTypeCreationAttributes = Optional<LocationTypeAttributes, LocationTypeOptionalAttributes>;

export class LocationType extends Model<LocationTypeAttributes, LocationTypeCreationAttributes> implements LocationTypeAttributes {
  typeId!: number;
  typeName!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // LocationType hasMany AppLocation via typeId
  appLocations!: AppLocation[];
  getAppLocations!: Sequelize.HasManyGetAssociationsMixin<AppLocation>;
  setAppLocations!: Sequelize.HasManySetAssociationsMixin<AppLocation, AppLocationId>;
  addAppLocation!: Sequelize.HasManyAddAssociationMixin<AppLocation, AppLocationId>;
  addAppLocations!: Sequelize.HasManyAddAssociationsMixin<AppLocation, AppLocationId>;
  createAppLocation!: Sequelize.HasManyCreateAssociationMixin<AppLocation>;
  removeAppLocation!: Sequelize.HasManyRemoveAssociationMixin<AppLocation, AppLocationId>;
  removeAppLocations!: Sequelize.HasManyRemoveAssociationsMixin<AppLocation, AppLocationId>;
  hasAppLocation!: Sequelize.HasManyHasAssociationMixin<AppLocation, AppLocationId>;
  hasAppLocations!: Sequelize.HasManyHasAssociationsMixin<AppLocation, AppLocationId>;
  countAppLocations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof LocationType {
    return sequelize.define('LocationType', {
    typeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'type_id'
    },
    typeName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'type_name'
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
    tableName: 'location_types',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  }) as typeof LocationType;
  }
}
