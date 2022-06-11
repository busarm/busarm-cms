import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppAgent, AppAgentId } from './app_agent';
import type { AppLocation, AppLocationId } from './app_location';
import type { AppPartner, AppPartnerId } from './app_partner';

export interface PartnerBranchAttributes {
  branchId: number;
  branchName?: string;
  isActive?: number;
  locId?: number;
  partnerId?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartnerBranchPk = "branchId";
export type PartnerBranchId = PartnerBranch[PartnerBranchPk];
export type PartnerBranchOptionalAttributes = "branchId" | "branchName" | "isActive" | "locId" | "partnerId" | "createdAt" | "updatedAt";
export type PartnerBranchCreationAttributes = Optional<PartnerBranchAttributes, PartnerBranchOptionalAttributes>;

export class PartnerBranch extends Model<PartnerBranchAttributes, PartnerBranchCreationAttributes> implements PartnerBranchAttributes {
  branchId!: number;
  branchName?: string;
  isActive?: number;
  locId?: number;
  partnerId?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // PartnerBranch belongsTo AppLocation via locId
  loc!: AppLocation;
  getLoc!: Sequelize.BelongsToGetAssociationMixin<AppLocation>;
  setLoc!: Sequelize.BelongsToSetAssociationMixin<AppLocation, AppLocationId>;
  createLoc!: Sequelize.BelongsToCreateAssociationMixin<AppLocation>;
  // PartnerBranch belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;
  // PartnerBranch hasMany AppAgent via branchId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof PartnerBranch {
    return sequelize.define('PartnerBranch', {
    branchId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'branch_id'
    },
    branchName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'branch_name'
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: true,
      field: 'is_active'
    },
    locId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_locations',
        key: 'loc_id'
      },
      field: 'loc_id'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'app_partners',
        key: 'partner_id'
      },
      field: 'partner_id'
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
    tableName: 'partner_branches',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "branch_id" },
        ]
      },
      {
        name: "loc_id",
        using: "BTREE",
        fields: [
          { name: "loc_id" },
        ]
      },
      {
        name: "partner_id",
        using: "BTREE",
        fields: [
          { name: "partner_id" },
        ]
      },
    ]
  }) as typeof PartnerBranch;
  }
}
