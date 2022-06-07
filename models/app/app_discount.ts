import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppText, AppTextId } from './app_text';
import type { BookingDiscount, BookingDiscountId } from './booking_discount';
import type { TripDiscount, TripDiscountId } from './trip_discount';

export interface AppDiscountAttributes {
  discountCode: string;
  discountDescTextId: number;
  discountValue: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppDiscountPk = "discountCode";
export type AppDiscountId = AppDiscount[AppDiscountPk];
export type AppDiscountOptionalAttributes = "createdAt" | "updatedAt";
export type AppDiscountCreationAttributes = Optional<AppDiscountAttributes, AppDiscountOptionalAttributes>;

export class AppDiscount extends Model<AppDiscountAttributes, AppDiscountCreationAttributes> implements AppDiscountAttributes {
  discountCode!: string;
  discountDescTextId!: number;
  discountValue!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppDiscount hasMany BookingDiscount via discountCode
  bookingDiscounts!: BookingDiscount[];
  getBookingDiscounts!: Sequelize.HasManyGetAssociationsMixin<BookingDiscount>;
  setBookingDiscounts!: Sequelize.HasManySetAssociationsMixin<BookingDiscount, BookingDiscountId>;
  addBookingDiscount!: Sequelize.HasManyAddAssociationMixin<BookingDiscount, BookingDiscountId>;
  addBookingDiscounts!: Sequelize.HasManyAddAssociationsMixin<BookingDiscount, BookingDiscountId>;
  createBookingDiscount!: Sequelize.HasManyCreateAssociationMixin<BookingDiscount>;
  removeBookingDiscount!: Sequelize.HasManyRemoveAssociationMixin<BookingDiscount, BookingDiscountId>;
  removeBookingDiscounts!: Sequelize.HasManyRemoveAssociationsMixin<BookingDiscount, BookingDiscountId>;
  hasBookingDiscount!: Sequelize.HasManyHasAssociationMixin<BookingDiscount, BookingDiscountId>;
  hasBookingDiscounts!: Sequelize.HasManyHasAssociationsMixin<BookingDiscount, BookingDiscountId>;
  countBookingDiscounts!: Sequelize.HasManyCountAssociationsMixin;
  // AppDiscount hasMany TripDiscount via discountCode
  tripDiscounts!: TripDiscount[];
  getTripDiscounts!: Sequelize.HasManyGetAssociationsMixin<TripDiscount>;
  setTripDiscounts!: Sequelize.HasManySetAssociationsMixin<TripDiscount, TripDiscountId>;
  addTripDiscount!: Sequelize.HasManyAddAssociationMixin<TripDiscount, TripDiscountId>;
  addTripDiscounts!: Sequelize.HasManyAddAssociationsMixin<TripDiscount, TripDiscountId>;
  createTripDiscount!: Sequelize.HasManyCreateAssociationMixin<TripDiscount>;
  removeTripDiscount!: Sequelize.HasManyRemoveAssociationMixin<TripDiscount, TripDiscountId>;
  removeTripDiscounts!: Sequelize.HasManyRemoveAssociationsMixin<TripDiscount, TripDiscountId>;
  hasTripDiscount!: Sequelize.HasManyHasAssociationMixin<TripDiscount, TripDiscountId>;
  hasTripDiscounts!: Sequelize.HasManyHasAssociationsMixin<TripDiscount, TripDiscountId>;
  countTripDiscounts!: Sequelize.HasManyCountAssociationsMixin;
  // AppDiscount belongsTo AppText via discountDescTextId
  discountDescText!: AppText;
  getDiscountDescText!: Sequelize.BelongsToGetAssociationMixin<AppText>;
  setDiscountDescText!: Sequelize.BelongsToSetAssociationMixin<AppText, AppTextId>;
  createDiscountDescText!: Sequelize.BelongsToCreateAssociationMixin<AppText>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppDiscount {
    return sequelize.define('AppDiscount', {
    discountCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'discount_code'
    },
    discountDescTextId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_texts',
        key: 'text_id'
      },
      field: 'discount_desc_text_id'
    },
    discountValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'discount_value'
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
    tableName: 'app_discounts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discount_code" },
        ]
      },
      {
        name: "discount_desc_text_id",
        using: "BTREE",
        fields: [
          { name: "discount_desc_text_id" },
        ]
      },
    ]
  }) as typeof AppDiscount;
  }
}
