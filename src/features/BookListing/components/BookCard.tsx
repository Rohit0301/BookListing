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

import { IBook } from "../types";
import {
  isEmpty,
  dateFormatter,
  getNameFirstCharacter,
  stringToColor,
} from "../../../lib/utils";
import DividerDot from "../../../components/ui/DividerDot";
import CustomButton from "../../../components/ui/CustomButton";

interface Props {
  bookDetails: IBook;
}

const BookCard: FC<Props> = ({ bookDetails }): JSX.Element | null => {
  if (isEmpty(bookDetails)) return null;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            sx={{ bgcolor: stringToColor(bookDetails?.name) }}
          >
            {getNameFirstCharacter(bookDetails?.name)}
          </Avatar>
        }
        title={bookDetails?.name}
        subheader={
          <Box className="d-flex align-items-center gap-8">
            {bookDetails?.author} <DividerDot size="small" />
            {dateFormatter(bookDetails?.createdAt, "MMMM Do YYYY")}
          </Box>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {bookDetails?.description}
        </Typography>
      </CardContent>
      <CardActions className="justify-content-end">
        <CustomButton
          label="Edit"
          Icon={<EditOutlinedIcon />}
          onClick={() => null}
        />
        <CustomButton
          label="Delete"
          Icon={<DeleteOutline />}
          color="error"
          onClick={() => null}
        />
      </CardActions>
    </Card>
  );
};

export default BookCard;
