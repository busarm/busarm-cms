import Flat from 'flat';
import React, { useState } from 'react';
import { BasePropertyProps } from 'adminjs';
import { Box, Label } from '@adminjs/design-system';
import ImageViewer from '../utils/ImageViewer';

/**
 * @param {BasePropertyProps} props
 * @param {String} props.property.props.info More info for property
 * @param {String} props.property.props.width Image width
 * @param {String} props.property.props.height Image height
 * @returns {JSX.Element}
 */
const ViewImage: React.FC<BasePropertyProps> = (props: BasePropertyProps): JSX.Element => {
    const { property, where, record } = props;
    const [data]: [String, Function] = useState(Flat.unflatten(record.params)[property.name]);

    return (
        <Box style={{ marginTop: 20, marginBottom: 20 }}>
            {where !== 'list' && <Label style={{ display: property.hideLabel ? 'none' : 'block', color: where === 'edit' ? 'black' : '#898A9A' }}>{property.label}</Label>}
            {where === 'edit' && (
                <Label style={{ color: 'blue', fontSize: 11, display: property.props.info ? 'block' : 'none' }}>{property.props.info}</Label>
            )}
            <ImageViewer
                src={data}
                width={+props.property.props.width || null}
                height={+props.property.props.height || 100}
            />
            {where === 'edit' && (
                <Label style={{ marginTop: 2, color: 'red', fontSize: 12, display: record.errors[property.name] ? 'block' : 'none' }}>
                    {record.errors[property.name] ? record.errors[property.name].message : ''}
                </Label>
            )}
        </Box>
    );
};
export default ViewImage;
