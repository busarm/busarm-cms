import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppTrip, AppTripId } from './app_trip';

export interface TripPickupAttributes {
  id: number;
  tripId: number;
  locId: number;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TripPickupPk = "id";
export type TripPickupId = TripPickup[TripPickupPk];
export type TripPickupOptionalAttributes = "id" | "isActive" | "createdAt" | "updatedAt";
export type TripPickupCreationAttributes = Optional<TripPickupAttributes, TripPickupOptionalAttributes>;

export class TripPickup extends Model<TripPickupAttributes, TripPickupCreationAttributes> implements TripPickupAttributes {
  id!: number;
  tripId!: number;
  locId!: number;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TripPickup belongsTo AppLocation via locId
  loc!: AppLocation;
  getLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // TripPickup belongsTo AppTrip via tripId
  trip!: AppTrip;
  getTrip!: Sequelize.BelongsToGetAssociationMixin<AppTrip>;
  setTrip!: Sequelize.BelongsToSetAssociationMixin<AppTrip, AppTripId>;
  createTrip!: Sequelize.BelongsToCreateAssociationMixin<AppTrip>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TripPickup {
    return sequelize.define('TripPickup', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_trips',
        key: 'trip_id'
      },
      field: 'trip_id'
    },
    locId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'loc_id'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      field: 'is_active'
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
    tableName: 'trip_pickup',
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
      {
        name: "trip_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "trip_id" },
          { name: "loc_id" },
        ]
      },
      {
        name: "loc_id",
        using: "BTREE",
        fields: [
          { name: "loc_id" },
        ]
      },
    ]
  }) as typeof TripPickup;
  }
}
