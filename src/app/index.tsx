import Box from "@mui/material/Box";

import Theme from "./theme";
import BookListing from "../pages/BookListing";
import { SnackBarprovider } from "../context/snackbar";

const App = (): JSX.Element => {
  return (
    <Box className="main-container">
      <Theme>
        <SnackBarprovider>
          <BookListing />
        </SnackBarprovider>
      </Theme>
    </Box>
  );
};

export default App;
