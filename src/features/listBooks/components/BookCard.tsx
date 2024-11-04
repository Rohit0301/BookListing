import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { IBook } from "../../../types";
import {
  isEmpty,
  dateFormatter,
  getNameFirstCharacter,
  stringToColor,
} from "../../../lib/utils";
import DividerDot from "../../../components/ui/DividerDot";
import CustomButton from "../../../components/ui/CustomButton";
import DeleteModal from "../../deleteBook/components/DeleteModal";
import AddEditBookModal from "../../addEditBook/components/AddEditBookModal";

interface Props {
  bookDetails: IBook;
}

const BookCard: FC<Props> = ({ bookDetails }): JSX.Element | null => {
  if (isEmpty(bookDetails)) return null;
  return (
    <Card sx={{ height: 200 }} aria-label="book-card">
      <CardHeader
        avatar={
          <Avatar
            aria-label="author-logo"
            sx={{ bgcolor: stringToColor(bookDetails?.author) }}
          >
            {getNameFirstCharacter(bookDetails?.author)}
          </Avatar>
        }
        title={bookDetails?.name}
        subheader={
          <Box className="d-flex align-items-center gap-8">
            <Box
              sx={{
                maxWidth: "40%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {bookDetails?.author}
            </Box>{" "}
            <DividerDot size="small" />
            <Box
              sx={{
                flex: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {dateFormatter(bookDetails?.createdAt, "MMMM Do YYYY")}
            </Box>
          </Box>
        }
      />
      <CardContent sx={{ pt: 0, height: "calc(100% - 120px)" }}>
        <Typography variant="body2">{bookDetails?.description}</Typography>
      </CardContent>
      <CardActions className="justify-content-end">
        <AddEditBookModal
          title="Edit Book Detials"
          okText="Edit Book"
          bookDetails={bookDetails}
          renderButtonComponent={
            <CustomButton
              label="Edit"
              color="secondary"
              Icon={<EditOutlinedIcon />}
            />
          }
        />
        <DeleteModal
          bookId={bookDetails?.id}
          renderButtonComponent={
            <CustomButton
              label="Delete"
              color="error"
              Icon={<DeleteOutline />}
            />
          }
        />
      </CardActions>
    </Card>
  );
};

export default BookCard;
