import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppText, AppTextId } from './app_text';
import type { BookingPromo, BookingPromoId } from './booking_promo';
import type { PromoType, PromoTypeId } from './promo_type';
import type { TripPromo, TripPromoId } from './trip_promo';

export interface AppPromoAttributes {
  promoCode: string;
  promoDescTextId: number;
  promoTypeId: number;
  promoValue: number;
  promoImgUrl: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppPromoPk = "promoCode";
export type AppPromoId = AppPromo[AppPromoPk];
export type AppPromoOptionalAttributes = "createdAt" | "updatedAt";
export type AppPromoCreationAttributes = Optional<AppPromoAttributes, AppPromoOptionalAttributes>;

export class AppPromo extends Model<AppPromoAttributes, AppPromoCreationAttributes> implements AppPromoAttributes {
  promoCode!: string;
  promoDescTextId!: number;
  promoTypeId!: number;
  promoValue!: number;
  promoImgUrl!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppPromo hasMany BookingPromo via promoCode
  bookingPromos!: BookingPromo[];
  getBookingPromos!: Sequelize.HasManyGetAssociationsMixin<BookingPromo>;
  setBookingPromos!: Sequelize.HasManySetAssociationsMixin<BookingPromo, BookingPromoId>;
  addBookingPromo!: Sequelize.HasManyAddAssociationMixin<BookingPromo, BookingPromoId>;
  addBookingPromos!: Sequelize.HasManyAddAssociationsMixin<BookingPromo, BookingPromoId>;
  createBookingPromo!: Sequelize.HasManyCreateAssociationMixin<BookingPromo>;
  removeBookingPromo!: Sequelize.HasManyRemoveAssociationMixin<BookingPromo, BookingPromoId>;
  removeBookingPromos!: Sequelize.HasManyRemoveAssociationsMixin<BookingPromo, BookingPromoId>;
  hasBookingPromo!: Sequelize.HasManyHasAssociationMixin<BookingPromo, BookingPromoId>;
  hasBookingPromos!: Sequelize.HasManyHasAssociationsMixin<BookingPromo, BookingPromoId>;
  countBookingPromos!: Sequelize.HasManyCountAssociationsMixin;
  // AppPromo hasMany TripPromo via promoCode
  tripPromos!: TripPromo[];
  getTripPromos!: Sequelize.HasManyGetAssociationsMixin<TripPromo>;
  setTripPromos!: Sequelize.HasManySetAssociationsMixin<TripPromo, TripPromoId>;
  addTripPromo!: Sequelize.HasManyAddAssociationMixin<TripPromo, TripPromoId>;
  addTripPromos!: Sequelize.HasManyAddAssociationsMixin<TripPromo, TripPromoId>;
  createTripPromo!: Sequelize.HasManyCreateAssociationMixin<TripPromo>;
  removeTripPromo!: Sequelize.HasManyRemoveAssociationMixin<TripPromo, TripPromoId>;
  removeTripPromos!: Sequelize.HasManyRemoveAssociationsMixin<TripPromo, TripPromoId>;
  hasTripPromo!: Sequelize.HasManyHasAssociationMixin<TripPromo, TripPromoId>;
  hasTripPromos!: Sequelize.HasManyHasAssociationsMixin<TripPromo, TripPromoId>;
  countTripPromos!: Sequelize.HasManyCountAssociationsMixin;
  // AppPromo belongsTo AppText via promoDescTextId
  promoDescText!: AppText;
  getPromoDescText!: Sequelize.BelongsToGetAssociationMixin<AppText>;
  setPromoDescText!: Sequelize.BelongsToSetAssociationMixin<AppText, AppTextId>;
  createPromoDescText!: Sequelize.BelongsToCreateAssociationMixin<AppText>;
  // AppPromo belongsTo PromoType via promoTypeId
  promoType!: PromoType;
  getPromoType!: Sequelize.BelongsToGetAssociationMixin<PromoType>;
  setPromoType!: Sequelize.BelongsToSetAssociationMixin<PromoType, PromoTypeId>;
  createPromoType!: Sequelize.BelongsToCreateAssociationMixin<PromoType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppPromo {
    return sequelize.define('AppPromo', {
    promoCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'promo_code'
    },
    promoDescTextId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_texts',
        key: 'text_id'
      },
      field: 'promo_desc_text_id'
    },
    promoTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'promo_type',
        key: 'type_id'
      },
      field: 'promo_type_id'
    },
    promoValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'promo_value'
    },
    promoImgUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'promo_img_url'
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
    tableName: 'app_promo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "promo_code" },
        ]
      },
      {
        name: "promo_desc_text_id",
        using: "BTREE",
        fields: [
          { name: "promo_desc_text_id" },
        ]
      },
      {
        name: "promo_type_id",
        using: "BTREE",
        fields: [
          { name: "promo_type_id" },
        ]
      },
    ]
  }) as typeof AppPromo;
  }
}
