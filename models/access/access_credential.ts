import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AccessCredentialAttributes {
  id: number;
  username: string;
  password: string;
  salt: string;
  isActive: number;
  role?: string;
  permissions?: object;
  attempts?: number;
  attemptedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type AccessCredentialPk = "id";
export type AccessCredentialId = AccessCredential[AccessCredentialPk];
export type AccessCredentialOptionalAttributes = "id" | "isActive" | "role" | "permissions" | "attempts" | "attemptedAt" | "createdAt" | "updatedAt";
export type AccessCredentialCreationAttributes = Optional<AccessCredentialAttributes, AccessCredentialOptionalAttributes>;

export class AccessCredential extends Model<AccessCredentialAttributes, AccessCredentialCreationAttributes> implements AccessCredentialAttributes {
  id!: number;
  username!: string;
  password!: string;
  salt!: string;
  isActive!: number;
  role?: string;
  permissions?: object;
  attempts?: number;
  attemptedAt?: Date;
  createdAt!: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AccessCredential {
    return sequelize.define('AccessCredential', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      field: 'is_active'
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: true
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    attemptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'attempted_at'
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
    tableName: 'access_credentials',
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  }) as typeof AccessCredential;
  }
}
