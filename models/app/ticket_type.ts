import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppText, AppTextId } from './app_text';
import type { AppTicket, AppTicketId } from './app_ticket';

export interface TicketTypeAttributes {
  typeId: number;
  typeName: string;
  textId: number;
  isDefault?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type TicketTypePk = "typeId";
export type TicketTypeId = TicketType[TicketTypePk];
export type TicketTypeOptionalAttributes = "typeId" | "isDefault" | "createdAt" | "updatedAt";
export type TicketTypeCreationAttributes = Optional<TicketTypeAttributes, TicketTypeOptionalAttributes>;

export class TicketType extends Model<TicketTypeAttributes, TicketTypeCreationAttributes> implements TicketTypeAttributes {
  typeId!: number;
  typeName!: string;
  textId!: number;
  isDefault?: number;
  createdAt!: Date;
  updatedAt?: Date;

  // TicketType belongsTo AppText via textId
  text!: AppText;
  getText!: Sequelize.BelongsToGetAssociationMixin<AppText>;
  setText!: Sequelize.BelongsToSetAssociationMixin<AppText, AppTextId>;
  createText!: Sequelize.BelongsToCreateAssociationMixin<AppText>;
  // TicketType hasMany AppTicket via typeId
  appTickets!: AppTicket[];
  getAppTickets!: Sequelize.HasManyGetAssociationsMixin<AppTicket>;
  setAppTickets!: Sequelize.HasManySetAssociationsMixin<AppTicket, AppTicketId>;
  addAppTicket!: Sequelize.HasManyAddAssociationMixin<AppTicket, AppTicketId>;
  addAppTickets!: Sequelize.HasManyAddAssociationsMixin<AppTicket, AppTicketId>;
  createAppTicket!: Sequelize.HasManyCreateAssociationMixin<AppTicket>;
  removeAppTicket!: Sequelize.HasManyRemoveAssociationMixin<AppTicket, AppTicketId>;
  removeAppTickets!: Sequelize.HasManyRemoveAssociationsMixin<AppTicket, AppTicketId>;
  hasAppTicket!: Sequelize.HasManyHasAssociationMixin<AppTicket, AppTicketId>;
  hasAppTickets!: Sequelize.HasManyHasAssociationsMixin<AppTicket, AppTicketId>;
  countAppTickets!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof TicketType {
    return sequelize.define('TicketType', {
    typeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'type_id'
    },
    typeName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'type_name'
    },
    textId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_texts',
        key: 'text_id'
      },
      field: 'text_id'
    },
    isDefault: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
    tableName: 'ticket_types',
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
      {
        name: "text_id",
        using: "BTREE",
        fields: [
          { name: "text_id" },
        ]
      },
    ]
  }) as typeof TicketType;
  }
}
