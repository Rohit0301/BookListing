import React, { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./styles.css";

interface Props {
  id: string;
  label: string;
  error: string;
  onChange: (
    value: string,
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  value: string;
  rows?: number;
  placeholder?: string;
  multiline?: boolean;
  otherProps?: object;
}

const TextInput: FC<Props> = ({
  id,
  label,
  value,
  rows = 4,
  error = "",
  onChange,
  placeholder = "",
  multiline = false,
  otherProps = {},
}) => {
  return (
    <Box className="text-field-container">
      <label htmlFor={id}>{label}</label>
      <TextField
        id={id}
        error={Boolean(error)}
        rows={rows}
        placeholder={placeholder || label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value, event.target.name, event)
        }
        value={value}
        variant="outlined"
        helperText={error}
        multiline={multiline}
        {...otherProps}
      />
    </Box>
  );
};

export default TextInput;
