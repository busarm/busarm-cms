import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppUser, AppUserId } from './app_user';
import type { BankAccount, BankAccountId } from './bank_account';

export interface UserBankAccountAttributes {
  userId: string;
  accountId: number;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type UserBankAccountPk = "userId";
export type UserBankAccountId = UserBankAccount[UserBankAccountPk];
export type UserBankAccountOptionalAttributes = "isActive" | "createdAt" | "updatedAt";
export type UserBankAccountCreationAttributes = Optional<UserBankAccountAttributes, UserBankAccountOptionalAttributes>;

export class UserBankAccount extends Model<UserBankAccountAttributes, UserBankAccountCreationAttributes> implements UserBankAccountAttributes {
  userId!: string;
  accountId!: number;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // UserBankAccount belongsTo AppUser via userId
  user!: AppUser;
  getUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;
  // UserBankAccount belongsTo BankAccount via accountId
  account!: BankAccount;
  getAccount!: Sequelize.BelongsToGetAssociationMixin<BankAccount>;
  setAccount!: Sequelize.BelongsToSetAssociationMixin<BankAccount, BankAccountId>;
  createAccount!: Sequelize.BelongsToCreateAssociationMixin<BankAccount>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserBankAccount {
    return sequelize.define('UserBankAccount', {
    userId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_users',
        key: 'user_id'
      },
      field: 'user_id'
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bank_accounts',
        key: 'account_id'
      },
      field: 'account_id'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      field: 'is_active'
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
    tableName: 'user_bank_account',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "account_id",
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  }) as typeof UserBankAccount;
  }
}
