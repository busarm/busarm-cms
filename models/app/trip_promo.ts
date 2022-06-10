import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppPromo, AppPromoId } from './app_promo';

export interface TripPromoAttributes {
  id: number;
  tripId: number;
  promoCode: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type TripPromoPk = "id";
export type TripPromoId = TripPromo[TripPromoPk];
export type TripPromoOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type TripPromoCreationAttributes = Optional<TripPromoAttributes, TripPromoOptionalAttributes>;

export class TripPromo extends Model<TripPromoAttributes, TripPromoCreationAttributes> implements TripPromoAttributes {
  id!: number;
  tripId!: number;
  promoCode!: string;
  startDate!: Date;
  endDate!: Date;
  createdAt!: Date;
  updatedAt?: Date;

  // TripPromo belongsTo AppPromo via promoCode
  promoCodeAppPromo!: AppPromo;
  getPromoCodeAppPromo!: Sequelize.BelongsToGetAssociationMixin<AppPromo>;
  setPromoCodeAppPromo!: Sequelize.BelongsToSetAssociationMixin<AppPromo, AppPromoId>;
  createPromoCodeAppPromo!: Sequelize.BelongsToCreateAssociationMixin<AppPromo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TripPromo {
    return sequelize.define('TripPromo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'trip_id'
    },
    promoCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'app_promo',
        key: 'promo_code'
      },
      field: 'promo_code'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date'
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
    tableName: 'trip_promo',
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
          { name: "promo_code" },
        ]
      },
      {
        name: "promo_code",
        using: "BTREE",
        fields: [
          { name: "promo_code" },
        ]
      },
    ]
  }) as typeof TripPromo;
  }
}
