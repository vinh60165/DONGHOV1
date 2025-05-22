// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
 
import FormPage from './page/FormPage';
import About from './page/About';


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <div style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<About />} />
                   <Route path="/Formpage" element={<FormPage />} />

        </Routes>
      </div>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
