import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppPartner, AppPartnerId } from './app_partner';
import type { AppTrip, AppTripId } from './app_trip';
import type { AppUser, AppUserId } from './app_user';
import type { PartnerBranch, PartnerBranchId } from './partner_branch';
import type { TripBus, TripBusId } from './trip_bus';

export interface AppAgentAttributes {
  agentId: number;
  partnerId: number;
  isActive: number;
  userId: string;
  branchId?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppAgentPk = "agentId";
export type AppAgentId = AppAgent[AppAgentPk];
export type AppAgentOptionalAttributes = "agentId" | "isActive" | "branchId" | "createdAt" | "updatedAt";
export type AppAgentCreationAttributes = Optional<AppAgentAttributes, AppAgentOptionalAttributes>;

export class AppAgent extends Model<AppAgentAttributes, AppAgentCreationAttributes> implements AppAgentAttributes {
  agentId!: number;
  partnerId!: number;
  isActive!: number;
  userId!: string;
  branchId?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppAgent hasMany AppTrip via agentId
  appTrips!: AppTrip[];
  getAppTrips!: Sequelize.HasManyGetAssociationsMixin<AppTrip>;
  setAppTrips!: Sequelize.HasManySetAssociationsMixin<AppTrip, AppTripId>;
  addAppTrip!: Sequelize.HasManyAddAssociationMixin<AppTrip, AppTripId>;
  addAppTrips!: Sequelize.HasManyAddAssociationsMixin<AppTrip, AppTripId>;
  createAppTrip!: Sequelize.HasManyCreateAssociationMixin<AppTrip>;
  removeAppTrip!: Sequelize.HasManyRemoveAssociationMixin<AppTrip, AppTripId>;
  removeAppTrips!: Sequelize.HasManyRemoveAssociationsMixin<AppTrip, AppTripId>;
  hasAppTrip!: Sequelize.HasManyHasAssociationMixin<AppTrip, AppTripId>;
  hasAppTrips!: Sequelize.HasManyHasAssociationsMixin<AppTrip, AppTripId>;
  countAppTrips!: Sequelize.HasManyCountAssociationsMixin;
  // AppAgent hasMany TripBus via agentId
  tripBuses!: TripBus[];
  getTripBuses!: Sequelize.HasManyGetAssociationsMixin<TripBus>;
  setTripBuses!: Sequelize.HasManySetAssociationsMixin<TripBus, TripBusId>;
  addTripBus!: Sequelize.HasManyAddAssociationMixin<TripBus, TripBusId>;
  addTripBuses!: Sequelize.HasManyAddAssociationsMixin<TripBus, TripBusId>;
  createTripBus!: Sequelize.HasManyCreateAssociationMixin<TripBus>;
  removeTripBus!: Sequelize.HasManyRemoveAssociationMixin<TripBus, TripBusId>;
  removeTripBuses!: Sequelize.HasManyRemoveAssociationsMixin<TripBus, TripBusId>;
  hasTripBus!: Sequelize.HasManyHasAssociationMixin<TripBus, TripBusId>;
  hasTripBuses!: Sequelize.HasManyHasAssociationsMixin<TripBus, TripBusId>;
  countTripBuses!: Sequelize.HasManyCountAssociationsMixin;
  // AppAgent belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;
  // AppAgent belongsTo AppUser via userId
  user!: AppUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;
  // AppAgent belongsTo PartnerBranch via branchId
  branch!: PartnerBranch;
  getBranch!: Sequelize.BelongsToGetAssociationMixin<PartnerBranch>;
  setBranch!: Sequelize.BelongsToSetAssociationMixin<PartnerBranch, PartnerBranchId>;
  createBranch!: Sequelize.BelongsToCreateAssociationMixin<PartnerBranch>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppAgent {
    return sequelize.define('AppAgent', {
    agentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'agent_id'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_partners',
        key: 'partner_id'
      },
      field: 'partner_id'
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      field: 'is_active'
    },
    userId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      references: {
        model: 'app_users',
        key: 'user_id'
      },
      unique: "app_agents_ibfk_3",
      field: 'user_id'
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'partner_branches',
        key: 'branch_id'
      },
      field: 'branch_id'
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
    tableName: 'app_agents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "agent_id" },
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
        name: "partner_id_2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "partner_id" },
          { name: "agent_id" },
        ]
      },
      {
        name: "branch_id",
        using: "BTREE",
        fields: [
          { name: "branch_id" },
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
  }) as typeof AppAgent;
  }
}
