import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import CollegesPage from './pages/CollegesPage';
import ExamExplorerPage from './pages/ExamExplorerPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f1117] transition-colors duration-200">
          <Navbar />
          <Routes>
            <Route path="/"              element={<HomePage />} />
            <Route path="/colleges"      element={<CollegesPage />} />
            <Route path="/exam-explorer" element={<ExamExplorerPage />} />
            <Route path="/dashboard"     element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
