import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box sx={{ maxWidth: 640 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        404, page not found
      </Typography>
      <Button component={RouterLink} to="/" variant="outlined">
        Back to start
      </Button>
    </Box>
  );
}
