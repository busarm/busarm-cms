import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AccessAuditAttributes {
  id: number;
  database: string;
  model: string;
  action: string;
  hash: string;
  data?: string;
  user?: string;
  session?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type AccessAuditPk = "id";
export type AccessAuditId = AccessAudit[AccessAuditPk];
export type AccessAuditOptionalAttributes = "id" | "data" | "user" | "session" | "createdAt" | "updatedAt";
export type AccessAuditCreationAttributes = Optional<AccessAuditAttributes, AccessAuditOptionalAttributes>;

export class AccessAudit extends Model<AccessAuditAttributes, AccessAuditCreationAttributes> implements AccessAuditAttributes {
  id!: number;
  database!: string;
  model!: string;
  action!: string;
  hash!: string;
  data?: string;
  user?: string;
  session?: string;
  createdAt!: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AccessAudit {
    return sequelize.define('AccessAudit', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    database: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "hash"
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    session: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'access_audit',
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
        name: "hash",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hash" },
        ]
      },
    ]
  }) as typeof AccessAudit;
  }
}
