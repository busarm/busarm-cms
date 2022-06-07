import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppPartner, AppPartnerId } from './app_partner';
import type { BankAccount, BankAccountId } from './bank_account';

export interface PartnerBankAccountAttributes {
  partnerId: number;
  accountId: number;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartnerBankAccountPk = "partnerId";
export type PartnerBankAccountId = PartnerBankAccount[PartnerBankAccountPk];
export type PartnerBankAccountOptionalAttributes = "isActive" | "createdAt" | "updatedAt";
export type PartnerBankAccountCreationAttributes = Optional<PartnerBankAccountAttributes, PartnerBankAccountOptionalAttributes>;

export class PartnerBankAccount extends Model<PartnerBankAccountAttributes, PartnerBankAccountCreationAttributes> implements PartnerBankAccountAttributes {
  partnerId!: number;
  accountId!: number;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // PartnerBankAccount belongsTo AppPartner via partnerId
  partner!: AppPartner;
  getPartner!: Sequelize.BelongsToGetAssociationMixin<AppPartner>;
  setPartner!: Sequelize.BelongsToSetAssociationMixin<AppPartner, AppPartnerId>;
  createPartner!: Sequelize.BelongsToCreateAssociationMixin<AppPartner>;
  // PartnerBankAccount belongsTo BankAccount via accountId
  account!: BankAccount;
  getAccount!: Sequelize.BelongsToGetAssociationMixin<BankAccount>;
  setAccount!: Sequelize.BelongsToSetAssociationMixin<BankAccount, BankAccountId>;
  createAccount!: Sequelize.BelongsToCreateAssociationMixin<BankAccount>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PartnerBankAccount {
    return sequelize.define('PartnerBankAccount', {
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'app_partners',
        key: 'partner_id'
      },
      field: 'partner_id'
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
    tableName: 'partner_bank_account',
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
        name: "account_id",
        using: "BTREE",
        fields: [
          { name: "account_id" },
        ]
      },
    ]
  }) as typeof PartnerBankAccount;
  }
}
