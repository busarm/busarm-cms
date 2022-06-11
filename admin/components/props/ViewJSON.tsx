import React, { useState } from 'react';
import ReactJson, { InteractionProps } from 'react-json-view';
import { BasePropertyProps } from 'adminjs';
import { Box, InputGroup, Label } from '@adminjs/design-system';
import Flat from 'flat';

/**
 * @param {BasePropertyProps} props
 * @param {String} props.property.props.info More info for property
 * @returns {JSX.Element}
 */
const ViewJSON: React.FC<BasePropertyProps> = (props: BasePropertyProps): JSX.Element => {
  const { property, record, where, onChange } = props;
  const [editable]: [Boolean, Function] = useState(where === 'edit' && onChange !== null);
  const [data, setData]: [Object, Function] = useState(
    Flat.unflatten(record.params)[property.name]
  );

  const onEdit = (props: InteractionProps) => {
    const newRecord = { ...record };
    if (editable) {
      onChange({
        ...newRecord,
        params: {
          ...newRecord.params,
          [property.name]: Flat.flatten(props.updated_src),
        },
      });
      setData(props.updated_src);
      return true;
    }
    return false;
  };

  return (
    <Box style={{ marginTop: 20, marginBottom: 20 }}>
      <Label
        style={{
          display: property.hideLabel ? 'none' : 'block',
          color: editable ? 'black' : '#898A9A',
        }}
      >
        {property.label}
      </Label>
      {editable && (
        <Label
          style={{ color: 'blue', fontSize: 11, display: property.props.info ? 'block' : 'none' }}
        >
          {property.props.info}
        </Label>
      )}
      {editable ? (
        <InputGroup>
          <ReactJson
            src={data ? data : {}}
            onEdit={editable ? onEdit : false}
            collapsed={false}
            name={property.name}
          />
        </InputGroup>
      ) : (
        <ReactJson
          src={data ? data : {}}
          onEdit={editable ? onEdit : false}
          collapsed={false}
          name={property.name}
        />
      )}
      {editable && (
        <Label
          style={{
            marginTop: 2,
            color: 'red',
            fontSize: 12,
            display: record.errors[property.name] ? 'block' : 'none',
          }}
        >
          {record.errors[property.name] ? record.errors[property.name].message : ''}
        </Label>
      )}
    </Box>
  );
};
export default ViewJSON;
