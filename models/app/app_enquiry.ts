import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EnquiryType, EnquiryTypeId } from './enquiry_type';

export interface AppEnquiryAttributes {
  enqId: number;
  enqName: string;
  enqEmail: string;
  enqMessage: string;
  typeId: number;
  responded: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppEnquiryPk = "enqId";
export type AppEnquiryId = AppEnquiry[AppEnquiryPk];
export type AppEnquiryOptionalAttributes = "enqId" | "responded" | "createdAt" | "updatedAt";
export type AppEnquiryCreationAttributes = Optional<AppEnquiryAttributes, AppEnquiryOptionalAttributes>;

export class AppEnquiry extends Model<AppEnquiryAttributes, AppEnquiryCreationAttributes> implements AppEnquiryAttributes {
  enqId!: number;
  enqName!: string;
  enqEmail!: string;
  enqMessage!: string;
  typeId!: number;
  responded!: number;
  createdAt!: Date;
  updatedAt?: Date;

  // AppEnquiry belongsTo EnquiryType via typeId
  type!: EnquiryType;
  getType!: Sequelize.BelongsToGetAssociationMixin<EnquiryType>;
  setType!: Sequelize.BelongsToSetAssociationMixin<EnquiryType, EnquiryTypeId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<EnquiryType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AppEnquiry {
    return sequelize.define('AppEnquiry', {
    enqId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'enq_id'
    },
    enqName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'enq_name'
    },
    enqEmail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'enq_email'
    },
    enqMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'enq_message'
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'enquiry_type',
        key: 'type_id'
      },
      field: 'type_id'
    },
    responded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'app_enquiries',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "enq_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  }) as typeof AppEnquiry;
  }
}
