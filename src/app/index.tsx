
import Box from "@mui/material/Box";

import Theme from "./theme";
import BookListing from "../pages/BookListing";

const App = (): JSX.Element => {
  return (
    <Box className="main-container">
      <Theme>
        <BookListing />
      </Theme>
    </Box>
  );
};

export default App;
