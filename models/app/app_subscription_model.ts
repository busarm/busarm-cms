import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AppSubscriptionModelAttributes {
  modelId: number;
  minCount?: number;
  countInterval?: number;
  fee?: number;
  currencyCode?: string;
  isActive?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppSubscriptionModelPk = "modelId";
export type AppSubscriptionModelId = AppSubscriptionModel[AppSubscriptionModelPk];
export type AppSubscriptionModelOptionalAttributes = "modelId" | "minCount" | "countInterval" | "fee" | "currencyCode" | "isActive" | "createdAt" | "updatedAt";
export type AppSubscriptionModelCreationAttributes = Optional<AppSubscriptionModelAttributes, AppSubscriptionModelOptionalAttributes>;

export class AppSubscriptionModel extends Model<AppSubscriptionModelAttributes, AppSubscriptionModelCreationAttributes> implements AppSubscriptionModelAttributes {
  modelId!: number;
  minCount?: number;
  countInterval?: number;
  fee?: number;
  currencyCode?: string;
  isActive?: number;
  createdAt!: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AppSubscriptionModel {
    return sequelize.define('AppSubscriptionModel', {
    modelId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'model_id'
    },
    minCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'min_count'
    },
    countInterval: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'count_interval'
    },
    fee: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    currencyCode: {
      type: DataTypes.STRING(5),
      allowNull: true,
      field: 'currency_code'
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
    tableName: 'app_subscription_model',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "model_id" },
        ]
      },
      {
        name: "currency_code",
        using: "BTREE",
        fields: [
          { name: "currency_code" },
        ]
      },
    ]
  }) as typeof AppSubscriptionModel;
  }
}
