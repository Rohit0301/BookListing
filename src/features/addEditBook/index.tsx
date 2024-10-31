import Box  from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddEditBookModal from './components/AddEditBookModal'

const AddBookHeader = (): JSX.Element => {
  return (
    <Box className="d-flex align-items-center justify-content-between" sx={{ background: "#fff", p: 2 }}>
        <Typography variant='h5'>Book Lists</Typography>
        <AddEditBookModal
        title="Add New Book"
        buttonText="Add New Book"
        okText="Add Book"
      />
    </Box>
  )
}

export default AddBookHeader