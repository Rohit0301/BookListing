import React from "react";
import Theme from "./theme";
import BookListing from "../pages/BookListing";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box className="main-container">
      <Theme>
        <BookListing />
      </Theme>
    </Box>
  );
};

export default App;
