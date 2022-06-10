import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBus, AppBusId } from './app_bus';

export interface BusImageAttributes {
  imageId: number;
  busId: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type BusImagePk = "imageId";
export type BusImageId = BusImage[BusImagePk];
export type BusImageOptionalAttributes = "imageId" | "createdAt" | "updatedAt";
export type BusImageCreationAttributes = Optional<BusImageAttributes, BusImageOptionalAttributes>;

export class BusImage extends Model<BusImageAttributes, BusImageCreationAttributes> implements BusImageAttributes {
  imageId!: number;
  busId!: number;
  imageUrl!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // BusImage belongsTo AppBus via busId
  bus!: AppBus;
  getBus!: Sequelize.BelongsToGetAssociationMixin<AppBus>;
  setBus!: Sequelize.BelongsToSetAssociationMixin<AppBus, AppBusId>;
  createBus!: Sequelize.BelongsToCreateAssociationMixin<AppBus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof BusImage {
    return sequelize.define('BusImage', {
    imageId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'image_id'
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_buses',
        key: 'bus_id'
      },
      field: 'bus_id'
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'image_url'
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
    tableName: 'bus_images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "image_id" },
        ]
      },
      {
        name: "bus_id",
        using: "BTREE",
        fields: [
          { name: "bus_id" },
        ]
      },
    ]
  }) as typeof BusImage;
  }
}
