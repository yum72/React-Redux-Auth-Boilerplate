import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Public from './routes/Public';
import SignIn from './routes/SignIn';
import Register from './routes/Register';
import Home from './routes/Home';
import NotFound from './routes/NotFound';

export default function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}
