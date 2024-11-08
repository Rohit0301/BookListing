import React, { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

interface Props {
  id: string; // Unique identifier for the input field
  name: string; // Name attribute for the input field
  label: string; // Label text for the input field
  error?: string; // Optional error message to display
  value?: string; // Optional value for the input field
  rows?: number; // Number of rows for multiline input
  placeholder?: string; // Placeholder text for the input field
  multiline?: boolean; // Indicates if the input should be a textarea
  otherProps?: object; // Additional props to spread onto the TextField component
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
}

const TextInput: FC<Props> = React.memo(({
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
});

export default TextInput;
