import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppStatus, AppStatusId } from './app_status';

export interface StatusTypeAttributes {
  typeId: number;
  typeDesc: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type StatusTypePk = "typeId";
export type StatusTypeId = StatusType[StatusTypePk];
export type StatusTypeOptionalAttributes = "createdAt" | "updatedAt";
export type StatusTypeCreationAttributes = Optional<StatusTypeAttributes, StatusTypeOptionalAttributes>;

export class StatusType extends Model<StatusTypeAttributes, StatusTypeCreationAttributes> implements StatusTypeAttributes {
  typeId!: number;
  typeDesc!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // StatusType hasMany AppStatus via typeId
  appStatuses!: AppStatus[];
  getAppStatuses!: Sequelize.HasManyGetAssociationsMixin<AppStatus>;
  setAppStatuses!: Sequelize.HasManySetAssociationsMixin<AppStatus, AppStatusId>;
  addAppStatus!: Sequelize.HasManyAddAssociationMixin<AppStatus, AppStatusId>;
  addAppStatuses!: Sequelize.HasManyAddAssociationsMixin<AppStatus, AppStatusId>;
  createAppStatus!: Sequelize.HasManyCreateAssociationMixin<AppStatus>;
  removeAppStatus!: Sequelize.HasManyRemoveAssociationMixin<AppStatus, AppStatusId>;
  removeAppStatuses!: Sequelize.HasManyRemoveAssociationsMixin<AppStatus, AppStatusId>;
  hasAppStatus!: Sequelize.HasManyHasAssociationMixin<AppStatus, AppStatusId>;
  hasAppStatuses!: Sequelize.HasManyHasAssociationsMixin<AppStatus, AppStatusId>;
  countAppStatuses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof StatusType {
    return sequelize.define('StatusType', {
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'type_id'
    },
    typeDesc: {
      type: DataTypes.STRING(100),
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
    tableName: 'status_type',
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
  }) as typeof StatusType;
  }
}
