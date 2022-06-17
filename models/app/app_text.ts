import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppBus, AppBusId } from './app_bus';
import type { AppDiscount, AppDiscountId } from './app_discount';
import type { AppLanguage, AppLanguageId } from './app_language';
import type { AppPromo, AppPromoId } from './app_promo';
import type { TicketType, TicketTypeId } from './ticket_type';

export interface AppTextAttributes {
  textId: number;
  langCode: string;
  textDetails: string;
  textContext: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppTextPk = "textId";
export type AppTextId = AppText[AppTextPk];
export type AppTextOptionalAttributes = "textId" | "langCode" | "createdAt" | "updatedAt";
export type AppTextCreationAttributes = Optional<AppTextAttributes, AppTextOptionalAttributes>;

export class AppText extends Model<AppTextAttributes, AppTextCreationAttributes> implements AppTextAttributes {
  textId!: number;
  langCode!: string;
  textDetails!: string;
  textContext!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // AppText belongsTo AppLanguage via langCode
  langCodeAppLanguage!: AppLanguage;
  getLangCodeAppLanguage!: Sequelize.BelongsToGetAssociationMixin<AppLanguage>;
  setLangCodeAppLanguage!: Sequelize.BelongsToSetAssociationMixin<AppLanguage, AppLanguageId>;
  createLangCodeAppLanguage!: Sequelize.BelongsToCreateAssociationMixin<AppLanguage>;
  // AppText hasMany AppBus via descTextId
  appBuses!: AppBus[];
  getAppBuses!: Sequelize.HasManyGetAssociationsMixin<AppBus>;
  setAppBuses!: Sequelize.HasManySetAssociationsMixin<AppBus, AppBusId>;
  addAppBus!: Sequelize.HasManyAddAssociationMixin<AppBus, AppBusId>;
  addAppBuses!: Sequelize.HasManyAddAssociationsMixin<AppBus, AppBusId>;
  createAppBus!: Sequelize.HasManyCreateAssociationMixin<AppBus>;
  removeAppBus!: Sequelize.HasManyRemoveAssociationMixin<AppBus, AppBusId>;
  removeAppBuses!: Sequelize.HasManyRemoveAssociationsMixin<AppBus, AppBusId>;
  hasAppBus!: Sequelize.HasManyHasAssociationMixin<AppBus, AppBusId>;
  hasAppBuses!: Sequelize.HasManyHasAssociationsMixin<AppBus, AppBusId>;
  countAppBuses!: Sequelize.HasManyCountAssociationsMixin;
  // AppText hasMany AppDiscount via discountDescTextId
  appDiscounts!: AppDiscount[];
  getAppDiscounts!: Sequelize.HasManyGetAssociationsMixin<AppDiscount>;
  setAppDiscounts!: Sequelize.HasManySetAssociationsMixin<AppDiscount, AppDiscountId>;
  addAppDiscount!: Sequelize.HasManyAddAssociationMixin<AppDiscount, AppDiscountId>;
  addAppDiscounts!: Sequelize.HasManyAddAssociationsMixin<AppDiscount, AppDiscountId>;
  createAppDiscount!: Sequelize.HasManyCreateAssociationMixin<AppDiscount>;
  removeAppDiscount!: Sequelize.HasManyRemoveAssociationMixin<AppDiscount, AppDiscountId>;
  removeAppDiscounts!: Sequelize.HasManyRemoveAssociationsMixin<AppDiscount, AppDiscountId>;
  hasAppDiscount!: Sequelize.HasManyHasAssociationMixin<AppDiscount, AppDiscountId>;
  hasAppDiscounts!: Sequelize.HasManyHasAssociationsMixin<AppDiscount, AppDiscountId>;
  countAppDiscounts!: Sequelize.HasManyCountAssociationsMixin;
  // AppText hasMany AppPromo via promoDescTextId
  appPromos!: AppPromo[];
  getAppPromos!: Sequelize.HasManyGetAssociationsMixin<AppPromo>;
  setAppPromos!: Sequelize.HasManySetAssociationsMixin<AppPromo, AppPromoId>;
  addAppPromo!: Sequelize.HasManyAddAssociationMixin<AppPromo, AppPromoId>;
  addAppPromos!: Sequelize.HasManyAddAssociationsMixin<AppPromo, AppPromoId>;
  createAppPromo!: Sequelize.HasManyCreateAssociationMixin<AppPromo>;
  removeAppPromo!: Sequelize.HasManyRemoveAssociationMixin<AppPromo, AppPromoId>;
  removeAppPromos!: Sequelize.HasManyRemoveAssociationsMixin<AppPromo, AppPromoId>;
  hasAppPromo!: Sequelize.HasManyHasAssociationMixin<AppPromo, AppPromoId>;
  hasAppPromos!: Sequelize.HasManyHasAssociationsMixin<AppPromo, AppPromoId>;
  countAppPromos!: Sequelize.HasManyCountAssociationsMixin;
  // AppText hasMany TicketType via textId
  ticketTypes!: TicketType[];
  getTicketTypes!: Sequelize.HasManyGetAssociationsMixin<TicketType>;
  setTicketTypes!: Sequelize.HasManySetAssociationsMixin<TicketType, TicketTypeId>;
  addTicketType!: Sequelize.HasManyAddAssociationMixin<TicketType, TicketTypeId>;
  addTicketTypes!: Sequelize.HasManyAddAssociationsMixin<TicketType, TicketTypeId>;
  createTicketType!: Sequelize.HasManyCreateAssociationMixin<TicketType>;
  removeTicketType!: Sequelize.HasManyRemoveAssociationMixin<TicketType, TicketTypeId>;
  removeTicketTypes!: Sequelize.HasManyRemoveAssociationsMixin<TicketType, TicketTypeId>;
  hasTicketType!: Sequelize.HasManyHasAssociationMixin<TicketType, TicketTypeId>;
  hasTicketTypes!: Sequelize.HasManyHasAssociationsMixin<TicketType, TicketTypeId>;
  countTicketTypes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppText {
    return sequelize.define('AppText', {
    textId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'text_id'
    },
    langCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "en_us",
      references: {
        model: 'app_languages',
        key: 'lang_code'
      },
      field: 'lang_code'
    },
    textDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'text_details'
    },
    textContext: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'text_context'
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
    tableName: 'app_texts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "text_id" },
        ]
      },
      {
        name: "lang_code",
        using: "BTREE",
        fields: [
          { name: "lang_code" },
        ]
      },
    ]
  }) as typeof AppText;
  }
}
