import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppPromo, AppPromoId } from './app_promo';

export interface PromoTypeAttributes {
  typeId: number;
  typeDesc: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type PromoTypePk = "typeId";
export type PromoTypeId = PromoType[PromoTypePk];
export type PromoTypeOptionalAttributes = "typeId" | "createdAt" | "updatedAt";
export type PromoTypeCreationAttributes = Optional<PromoTypeAttributes, PromoTypeOptionalAttributes>;

export class PromoType extends Model<PromoTypeAttributes, PromoTypeCreationAttributes> implements PromoTypeAttributes {
  typeId!: number;
  typeDesc!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // PromoType hasMany AppPromo via promoTypeId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof PromoType {
    return sequelize.define('PromoType', {
    typeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'type_id'
    },
    typeDesc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'type_desc'
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
    tableName: 'promo_type',
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
  }) as typeof PromoType;
  }
}
