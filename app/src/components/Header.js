// src/components/Header.js
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <nav>
        <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Trang chủ</Link>
        <Link to="/Formpage" style={{ marginRight: '15px', color: 'white' }}>Giới thiệu</Link>
        <Link to="/contact" style={{ color: 'white' }}>Liên hệ</Link>
      </nav>
    </header>
  );
}

export default Header;
