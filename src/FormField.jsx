import React, { useState } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Input, Button } from 'semantic-ui-react';
import ClearIcon from '@mui/icons-material/Clear';
import Switch from '@mui/material/Switch';
import './App.css';

export const FormField = ({ name, value, type, onChange, onDelete }) => {
  const [nestedFields, setNestedFields] = useState([]);

  const handleAddField = () => {
    setNestedFields([...nestedFields, { name: "", value: "", type: "string" }]);
  };

  const handleDeleteField = (index) => {
    const newNestedFields = [...nestedFields];
    newNestedFields.splice(index, 1);
    setNestedFields(newNestedFields);
  };

  const handleNestedFieldChange = (index, field) => {
    const newNestedFields = [...nestedFields];
    newNestedFields[index] = field;
    setNestedFields(newNestedFields);
  };

  const required = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div>
      <label>
        Field Name
      </label>  
      <Input
          type="text"
          name="name"
          value={name}
          placeholder="Field Name"
          className="input"
          
          onChange={(e) => onChange(e.target.name, e.target.value)}
       />
      <label>
        Field Type
        </label>  
        <select
          name="type"
          value={type}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className="dropdown"
        >
          <option value="string">STRING</option>
          <option value="number">NUMBER</option>
          <option value="boolean">BOOLEAN</option>
          <option value="object">OBJECT</option>
        </select>
        <label> REQUIRED </label>
        <Switch {...required}  defaultChecked />
      <button className="delete" onClick={() => onDelete()}><ClearIcon fontSize="small"/></button>
      {type === "object" && (
        <div className="nested">
          {nestedFields.map((field, index) => (
            <FormField
              key={index}
              name={field.name}
              value={field.value}
              type={field.type}
              onChange={(name, value) =>
                handleNestedFieldChange(index, { ...field, [name]: value })
              }
              onDelete={() => handleDeleteField(index)}
            />
          ))}
          <Button onClick={handleAddField}>Add Nested Field</Button>
        </div>
      )}
    </div>
  );
};