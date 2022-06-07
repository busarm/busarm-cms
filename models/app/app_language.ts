import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppText, AppTextId } from './app_text';
import type { AppUser, AppUserId } from './app_user';

export interface AppLanguageAttributes {
  langCode: string;
  langName: string;
  tags: string;
  isDefault: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppLanguagePk = "langCode";
export type AppLanguageId = AppLanguage[AppLanguagePk];
export type AppLanguageOptionalAttributes = "isDefault" | "createdAt" | "updatedAt";
export type AppLanguageCreationAttributes = Optional<AppLanguageAttributes, AppLanguageOptionalAttributes>;

export class AppLanguage extends Model<AppLanguageAttributes, AppLanguageCreationAttributes> implements AppLanguageAttributes {
  langCode!: string;
  langName!: string;
  tags!: string;
  isDefault!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppLanguage hasMany AppText via langCode
  appTexts!: AppText[];
  getAppTexts!: Sequelize.HasManyGetAssociationsMixin<AppText>;
  setAppTexts!: Sequelize.HasManySetAssociationsMixin<AppText, AppTextId>;
  addAppText!: Sequelize.HasManyAddAssociationMixin<AppText, AppTextId>;
  addAppTexts!: Sequelize.HasManyAddAssociationsMixin<AppText, AppTextId>;
  createAppText!: Sequelize.HasManyCreateAssociationMixin<AppText>;
  removeAppText!: Sequelize.HasManyRemoveAssociationMixin<AppText, AppTextId>;
  removeAppTexts!: Sequelize.HasManyRemoveAssociationsMixin<AppText, AppTextId>;
  hasAppText!: Sequelize.HasManyHasAssociationMixin<AppText, AppTextId>;
  hasAppTexts!: Sequelize.HasManyHasAssociationsMixin<AppText, AppTextId>;
  countAppTexts!: Sequelize.HasManyCountAssociationsMixin;
  // AppLanguage hasMany AppUser via userLangCode
  appUsers!: AppUser[];
  getAppUsers!: Sequelize.HasManyGetAssociationsMixin<AppUser>;
  setAppUsers!: Sequelize.HasManySetAssociationsMixin<AppUser, AppUserId>;
  addAppUser!: Sequelize.HasManyAddAssociationMixin<AppUser, AppUserId>;
  addAppUsers!: Sequelize.HasManyAddAssociationsMixin<AppUser, AppUserId>;
  createAppUser!: Sequelize.HasManyCreateAssociationMixin<AppUser>;
  removeAppUser!: Sequelize.HasManyRemoveAssociationMixin<AppUser, AppUserId>;
  removeAppUsers!: Sequelize.HasManyRemoveAssociationsMixin<AppUser, AppUserId>;
  hasAppUser!: Sequelize.HasManyHasAssociationMixin<AppUser, AppUserId>;
  hasAppUsers!: Sequelize.HasManyHasAssociationsMixin<AppUser, AppUserId>;
  countAppUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppLanguage {
    return sequelize.define('AppLanguage', {
    langCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'lang_code'
    },
    langName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'lang_name'
    },
    tags: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'is_default'
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
    tableName: 'app_languages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "lang_code" },
        ]
      },
    ]
  }) as typeof AppLanguage;
  }
}
