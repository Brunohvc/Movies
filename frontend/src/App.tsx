import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './shared/utils/styles';
import { Dashboard } from './presentation/pages/Dashboard';
import { Movies } from './presentation/pages/Movies';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;