import React from 'react';
import { BasePropertyProps } from 'adminjs';
import { Box, DropZone, Label } from '@adminjs/design-system';

/**
 * @param {BasePropertyProps} props
 * @param {String} props.property.props.info More info for property
 * @param {Boolean} props.property.props.multiple Whether or not to support multiple uploads
 * @param {Number} props.property.props.maxSizeBytes Max Size of uploaded file to support (in Bytes)
 * @param {String[]} props.property.props.mimeTypes Mime types of uploaded file to support (in Bytes)
 * @returns {JSX.Element}
 */
const UploadFile: React.FC<BasePropertyProps> = (props: BasePropertyProps): JSX.Element => {
    const { property, record, onChange } = props;

    const onUpload = (files: File[]) => {
        const newRecord = { ...record };
        const file = files.length && files[0];

        onChange({
            ...newRecord,
            params: {
                ...newRecord.params,
                [property.name]: file,
            },
        });
        event.preventDefault();
    };

    return (
        <Box style={{ marginTop: 20, marginBottom: 20 }}>
            <Label style={{ display: property.hideLabel ? 'none' : 'block' }}>{property.label}</Label>
            <Label style={{ color: 'blue', fontSize: 11, display: property.props.info ? 'block' : 'none' }}>{property.props.info}</Label>
            <DropZone
                uploadLimitIn={'MB'}
                validate={{ maxSize: Number(property.props?.maxSizeBytes), mimeTypes: property.props?.mimeTypes }}
                multiple={property.props?.multiple}
                onChange={onUpload}
            />
            <Label style={{ marginTop: 2, color: 'red', fontSize: 12, display: record.errors[property.name] ? 'block' : 'none' }}>
                {record.errors[property.name] ? record.errors[property.name].message : ''}
            </Label>
        </Box>
    );
};
export default UploadFile;
