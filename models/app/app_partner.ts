import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppAgent, AppAgentId } from './app_agent';
import type { AppBus, AppBusId } from './app_bus';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppUser, AppUserId } from './app_user';
import type { PartnerBankAccount, PartnerBankAccountCreationAttributes, PartnerBankAccountId } from './partner_bank_account';
import type { PartnerBranch, PartnerBranchId } from './partner_branch';
import type { PartnerLocation, PartnerLocationId } from './partner_location';
import type { PartnerSharedBus, PartnerSharedBusId } from './partner_shared_bus';

export interface AppPartnerAttributes {
  partnerId: number;
  partnerName: string;
  partnerLogo?: string;
  userId: string;
  verified: number;
  isActive: number;
  allowInternational: number;
  allowMultiCountries: number;
  accountId?: string;
  suspendAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppPartnerPk = "partnerId";
export type AppPartnerId = AppPartner[AppPartnerPk];
export type AppPartnerOptionalAttributes = "partnerId" | "partnerLogo" | "verified" | "isActive" | "allowInternational" | "allowMultiCountries" | "accountId" | "suspendAt" | "createdAt" | "updatedAt";
export type AppPartnerCreationAttributes = Optional<AppPartnerAttributes, AppPartnerOptionalAttributes>;

export class AppPartner extends Model<AppPartnerAttributes, AppPartnerCreationAttributes> implements AppPartnerAttributes {
  partnerId!: number;
  partnerName!: string;
  partnerLogo?: string;
  userId!: string;
  verified!: number;
  isActive!: number;
  allowInternational!: number;
  allowMultiCountries!: number;
  accountId?: string;
  suspendAt?: Date;
  createdAt!: Date;
  updatedAt?: Date;

  // AppPartner hasMany AppAgent via partnerId
  appAgents!: AppAgent[];
  getAppAgents!: Sequelize.HasManyGetAssociationsMixin<AppAgent>;
  setAppAgents!: Sequelize.HasManySetAssociationsMixin<AppAgent, AppAgentId>;
  addAppAgent!: Sequelize.HasManyAddAssociationMixin<AppAgent, AppAgentId>;
  addAppAgents!: Sequelize.HasManyAddAssociationsMixin<AppAgent, AppAgentId>;
  createAppAgent!: Sequelize.HasManyCreateAssociationMixin<AppAgent>;
  removeAppAgent!: Sequelize.HasManyRemoveAssociationMixin<AppAgent, AppAgentId>;
  removeAppAgents!: Sequelize.HasManyRemoveAssociationsMixin<AppAgent, AppAgentId>;
  hasAppAgent!: Sequelize.HasManyHasAssociationMixin<AppAgent, AppAgentId>;
  hasAppAgents!: Sequelize.HasManyHasAssociationsMixin<AppAgent, AppAgentId>;
  countAppAgents!: Sequelize.HasManyCountAssociationsMixin;
  // AppPartner hasMany AppBus via partnerId
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
  // AppPartner belongsToMany AppBus via partnerId and busId
  busIdAppBuses!: AppBus[];
  getBusIdAppBuses!: Sequelize.BelongsToManyGetAssociationsMixin<AppBus>;
  setBusIdAppBuses!: Sequelize.BelongsToManySetAssociationsMixin<AppBus, AppBusId>;
  addBusIdAppBus!: Sequelize.BelongsToManyAddAssociationMixin<AppBus, AppBusId>;
  addBusIdAppBuses!: Sequelize.BelongsToManyAddAssociationsMixin<AppBus, AppBusId>;
  createBusIdAppBus!: Sequelize.BelongsToManyCreateAssociationMixin<AppBus>;
  removeBusIdAppBus!: Sequelize.BelongsToManyRemoveAssociationMixin<AppBus, AppBusId>;
  removeBusIdAppBuses!: Sequelize.BelongsToManyRemoveAssociationsMixin<AppBus, AppBusId>;
  hasBusIdAppBus!: Sequelize.BelongsToManyHasAssociationMixin<AppBus, AppBusId>;
  hasBusIdAppBuses!: Sequelize.BelongsToManyHasAssociationsMixin<AppBus, AppBusId>;
  countBusIdAppBuses!: Sequelize.BelongsToManyCountAssociationsMixin;
  // AppPartner belongsToMany AppLocation via partnerId and locId
  locIdAppLocations!: AppLocation[];
  getLocIdAppLocations!: Sequelize.BelongsToManyGetAssociationsMixin<AppLocation>;
  setLocIdAppLocations!: Sequelize.BelongsToManySetAssociationsMixin<AppLocation, AppLocationId>;
  addLocIdAppLocation!: Sequelize.BelongsToManyAddAssociationMixin<AppLocation, AppLocationId>;
  addLocIdAppLocations!: Sequelize.BelongsToManyAddAssociationsMixin<AppLocation, AppLocationId>;
  createLocIdAppLocation!: Sequelize.BelongsToManyCreateAssociationMixin<AppLocation>;
  removeLocIdAppLocation!: Sequelize.BelongsToManyRemoveAssociationMixin<AppLocation, AppLocationId>;
  removeLocIdAppLocations!: Sequelize.BelongsToManyRemoveAssociationsMixin<AppLocation, AppLocationId>;
  hasLocIdAppLocation!: Sequelize.BelongsToManyHasAssociationMixin<AppLocation, AppLocationId>;
  hasLocIdAppLocations!: Sequelize.BelongsToManyHasAssociationsMixin<AppLocation, AppLocationId>;
  countLocIdAppLocations!: Sequelize.BelongsToManyCountAssociationsMixin;
  // AppPartner hasOne PartnerBankAccount via partnerId
  partnerBankAccount!: PartnerBankAccount;
  getPartnerBankAccount!: Sequelize.HasOneGetAssociationMixin<PartnerBankAccount>;
  setPartnerBankAccount!: Sequelize.HasOneSetAssociationMixin<PartnerBankAccount, PartnerBankAccountId>;
  createPartnerBankAccount!: Sequelize.HasOneCreateAssociationMixin<PartnerBankAccount>;
  // AppPartner hasMany PartnerBranch via partnerId
  partnerBranches!: PartnerBranch[];
  getPartnerBranches!: Sequelize.HasManyGetAssociationsMixin<PartnerBranch>;
  setPartnerBranches!: Sequelize.HasManySetAssociationsMixin<PartnerBranch, PartnerBranchId>;
  addPartnerBranch!: Sequelize.HasManyAddAssociationMixin<PartnerBranch, PartnerBranchId>;
  addPartnerBranches!: Sequelize.HasManyAddAssociationsMixin<PartnerBranch, PartnerBranchId>;
  createPartnerBranch!: Sequelize.HasManyCreateAssociationMixin<PartnerBranch>;
  removePartnerBranch!: Sequelize.HasManyRemoveAssociationMixin<PartnerBranch, PartnerBranchId>;
  removePartnerBranches!: Sequelize.HasManyRemoveAssociationsMixin<PartnerBranch, PartnerBranchId>;
  hasPartnerBranch!: Sequelize.HasManyHasAssociationMixin<PartnerBranch, PartnerBranchId>;
  hasPartnerBranches!: Sequelize.HasManyHasAssociationsMixin<PartnerBranch, PartnerBranchId>;
  countPartnerBranches!: Sequelize.HasManyCountAssociationsMixin;
  // AppPartner hasMany PartnerLocation via partnerId
  partnerLocations!: PartnerLocation[];
  getPartnerLocations!: Sequelize.HasManyGetAssociationsMixin<PartnerLocation>;
  setPartnerLocations!: Sequelize.HasManySetAssociationsMixin<PartnerLocation, PartnerLocationId>;
  addPartnerLocation!: Sequelize.HasManyAddAssociationMixin<PartnerLocation, PartnerLocationId>;
  addPartnerLocations!: Sequelize.HasManyAddAssociationsMixin<PartnerLocation, PartnerLocationId>;
  createPartnerLocation!: Sequelize.HasManyCreateAssociationMixin<PartnerLocation>;
  removePartnerLocation!: Sequelize.HasManyRemoveAssociationMixin<PartnerLocation, PartnerLocationId>;
  removePartnerLocations!: Sequelize.HasManyRemoveAssociationsMixin<PartnerLocation, PartnerLocationId>;
  hasPartnerLocation!: Sequelize.HasManyHasAssociationMixin<PartnerLocation, PartnerLocationId>;
  hasPartnerLocations!: Sequelize.HasManyHasAssociationsMixin<PartnerLocation, PartnerLocationId>;
  countPartnerLocations!: Sequelize.HasManyCountAssociationsMixin;
  // AppPartner hasMany PartnerSharedBus via partnerId
  partnerSharedBuses!: PartnerSharedBus[];
  getPartnerSharedBuses!: Sequelize.HasManyGetAssociationsMixin<PartnerSharedBus>;
  setPartnerSharedBuses!: Sequelize.HasManySetAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  addPartnerSharedBus!: Sequelize.HasManyAddAssociationMixin<PartnerSharedBus, PartnerSharedBusId>;
  addPartnerSharedBuses!: Sequelize.HasManyAddAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  createPartnerSharedBus!: Sequelize.HasManyCreateAssociationMixin<PartnerSharedBus>;
  removePartnerSharedBus!: Sequelize.HasManyRemoveAssociationMixin<PartnerSharedBus, PartnerSharedBusId>;
  removePartnerSharedBuses!: Sequelize.HasManyRemoveAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  hasPartnerSharedBus!: Sequelize.HasManyHasAssociationMixin<PartnerSharedBus, PartnerSharedBusId>;
  hasPartnerSharedBuses!: Sequelize.HasManyHasAssociationsMixin<PartnerSharedBus, PartnerSharedBusId>;
  countPartnerSharedBuses!: Sequelize.HasManyCountAssociationsMixin;
  // AppPartner belongsTo AppUser via userId
  user!: AppUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppPartner {
    return sequelize.define('AppPartner', {
    partnerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'partner_id'
    },
    partnerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'partner_name'
    },
    partnerLogo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'partner_logo'
    },
    userId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      references: {
        model: 'app_users',
        key: 'user_id'
      },
      unique: "app_partners_ibfk_1",
      field: 'user_id'
    },
    verified: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      field: 'is_active'
    },
    allowInternational: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      field: 'allow_international'
    },
    allowMultiCountries: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      field: 'allow_multi_countries'
    },
    accountId: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: "account_id",
      field: 'account_id'
    },
    suspendAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'suspend_at'
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
    tableName: 'app_partners',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "partner_id" },
        ]
      },
      {
        name: "user_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "account_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
    ]
  }) as typeof AppPartner;
  }
}
