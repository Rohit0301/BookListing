import React, { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

interface Props {
  id: string;
  name: string;
  label: string;
  error?: string;
  value?: string;
  rows?: number;
  placeholder?: string;
  multiline?: boolean;
  otherProps?: object;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<Props> = ({
  id,
  label,
  value,
  onChange,
  rows = 4,
  name = "",
  error = "",
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
        error={Boolean(error)}
        placeholder={placeholder || label}
        onChange={onChange}
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
