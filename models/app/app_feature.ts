import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AppFeatureAttributes {
  featureId: number;
  featureName: string;
  featureActive: number;
  isDefault: number;
  priorityLevel: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type AppFeaturePk = "featureId";
export type AppFeatureId = AppFeature[AppFeaturePk];
export type AppFeatureOptionalAttributes = "createdAt" | "updatedAt";
export type AppFeatureCreationAttributes = Optional<AppFeatureAttributes, AppFeatureOptionalAttributes>;

export class AppFeature extends Model<AppFeatureAttributes, AppFeatureCreationAttributes> implements AppFeatureAttributes {
  featureId!: number;
  featureName!: string;
  featureActive!: number;
  isDefault!: number;
  priorityLevel!: number;
  createdAt!: Date;
  updatedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof AppFeature {
    return sequelize.define('AppFeature', {
    featureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'feature_id'
    },
    featureName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'feature_name'
    },
    featureActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'feature_active'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_default'
    },
    priorityLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'priority_level'
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
    tableName: 'app_features',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "feature_id" },
        ]
      },
    ]
  }) as typeof AppFeature;
  }
}
