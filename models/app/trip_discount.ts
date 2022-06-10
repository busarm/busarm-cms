import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppDiscount, AppDiscountId } from './app_discount';

export interface TripDiscountAttributes {
  id: number;
  tripId: number;
  discountCode: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type TripDiscountPk = "id";
export type TripDiscountId = TripDiscount[TripDiscountPk];
export type TripDiscountOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type TripDiscountCreationAttributes = Optional<TripDiscountAttributes, TripDiscountOptionalAttributes>;

export class TripDiscount extends Model<TripDiscountAttributes, TripDiscountCreationAttributes> implements TripDiscountAttributes {
  id!: number;
  tripId!: number;
  discountCode!: string;
  startDate!: Date;
  endDate!: Date;
  createdAt!: Date;
  updatedAt?: Date;

  // TripDiscount belongsTo AppDiscount via discountCode
  discountCodeAppDiscount!: AppDiscount;
  getDiscountCodeAppDiscount!: Sequelize.BelongsToGetAssociationMixin<AppDiscount>;
  setDiscountCodeAppDiscount!: Sequelize.BelongsToSetAssociationMixin<AppDiscount, AppDiscountId>;
  createDiscountCodeAppDiscount!: Sequelize.BelongsToCreateAssociationMixin<AppDiscount>;

  static initModel(sequelize: Sequelize.Sequelize): typeof TripDiscount {
    return sequelize.define('TripDiscount', {
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
    discountCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'app_discounts',
        key: 'discount_code'
      },
      field: 'discount_code'
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
    tableName: 'trip_discount',
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
          { name: "discount_code" },
        ]
      },
      {
        name: "discount_code",
        using: "BTREE",
        fields: [
          { name: "discount_code" },
        ]
      },
    ]
  }) as typeof TripDiscount;
  }
}
