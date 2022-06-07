import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AppEnquiry, AppEnquiryId } from './app_enquiry';

export interface EnquiryTypeAttributes {
  typeId: number;
  typeTitle: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type EnquiryTypePk = "typeId";
export type EnquiryTypeId = EnquiryType[EnquiryTypePk];
export type EnquiryTypeOptionalAttributes = "typeId" | "createdAt" | "updatedAt";
export type EnquiryTypeCreationAttributes = Optional<EnquiryTypeAttributes, EnquiryTypeOptionalAttributes>;

export class EnquiryType extends Model<EnquiryTypeAttributes, EnquiryTypeCreationAttributes> implements EnquiryTypeAttributes {
  typeId!: number;
  typeTitle!: string;
  createdAt!: Date;
  updatedAt?: Date;

  // EnquiryType hasMany AppEnquiry via typeId
  appEnquiries!: AppEnquiry[];
  getAppEnquiries!: Sequelize.HasManyGetAssociationsMixin<AppEnquiry>;
  setAppEnquiries!: Sequelize.HasManySetAssociationsMixin<AppEnquiry, AppEnquiryId>;
  addAppEnquiry!: Sequelize.HasManyAddAssociationMixin<AppEnquiry, AppEnquiryId>;
  addAppEnquiries!: Sequelize.HasManyAddAssociationsMixin<AppEnquiry, AppEnquiryId>;
  createAppEnquiry!: Sequelize.HasManyCreateAssociationMixin<AppEnquiry>;
  removeAppEnquiry!: Sequelize.HasManyRemoveAssociationMixin<AppEnquiry, AppEnquiryId>;
  removeAppEnquiries!: Sequelize.HasManyRemoveAssociationsMixin<AppEnquiry, AppEnquiryId>;
  hasAppEnquiry!: Sequelize.HasManyHasAssociationMixin<AppEnquiry, AppEnquiryId>;
  hasAppEnquiries!: Sequelize.HasManyHasAssociationsMixin<AppEnquiry, AppEnquiryId>;
  countAppEnquiries!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof EnquiryType {
    return sequelize.define('EnquiryType', {
    typeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'type_id'
    },
    typeTitle: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'type_title'
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
    tableName: 'enquiry_type',
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
  }) as typeof EnquiryType;
  }
}
