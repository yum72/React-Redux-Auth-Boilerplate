import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Public from './routes/Public';
import SignIn from './routes/SignIn';
import Register from './routes/Register';
import Home from './routes/Home';
import NotFound from './routes/NotFound';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
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
      </main>
    </div>
  );
}
