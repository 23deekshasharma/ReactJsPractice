import React, { useState } from "react";
import { FormField } from "./FormField";
import { Button } from "semantic-ui-react";
import AddIcon from '@mui/icons-material/Add';

export const DynamicForm = () => {
    const [fields, setFields] = useState([{ name: "", value: "", type: "string" }]);
  
    const handleAddField = () => {
      setFields([...fields, { name: "", value: "", type: "string" }]);
    };
  
    const handleDeleteField = (index) => {
      const newFields = [...fields];
      newFields.splice(index, 1);
      setFields(newFields);
    };
  
    const handleFieldChange = (index, field) => {
      const newFields = [...fields];
      newFields[index] = field;
      setFields(newFields);
    };
  
    return (
      <div className="non-nested">
        {fields.map((field, index) => (
          <FormField
            key={index}
            name={field.name}
            value={field.value}
            type={field.type}
            onChange={(name, value) =>
              handleFieldChange(index, { ...field, [name]: value })
            }
            onDelete={() => handleDeleteField(index)}
          />
        ))}
        <Button onClick={handleAddField}><AddIcon /></Button>
      </div>
    );
  };