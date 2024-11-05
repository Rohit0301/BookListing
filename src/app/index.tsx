import Box from "@mui/material/Box";
import { Slide, ToastContainer } from "react-toastify";

import Theme from "./theme";
import BookListing from "../pages/BookListing";
import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => {
  return (
    <Box className="main-container">
      <Theme>
        <BookListing />
        <ToastContainer
          rtl={false}
          closeOnClick
          theme="light"
          autoClose={3000}
          transition={Slide}
          newestOnTop={false}
          position="top-right"
          hideProgressBar={false}
        />
      </Theme>
    </Box>
  );
};

export default App;
