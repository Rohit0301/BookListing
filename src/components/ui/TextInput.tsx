import React, { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";


interface Props {
  id: string;
  name: string;
  label: string;
  error?: string;
  onChange: (
    value: string,
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: string;
  rows?: number;
  required?: boolean
  placeholder?: string;
  multiline?: boolean;
  otherProps?: object;
}

const TextInput: FC<Props> = ({
  id,
  label,
  value,
  rows = 4,
  name = "",
  error = "",
  onChange,
  required = false,
  placeholder = "",
  multiline = false,
  otherProps = {},
}) => {
  return (
    <Box>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <TextField
        id={id}
        name={name}
        rows={rows}
        required={required}
        error={Boolean(error)}
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
