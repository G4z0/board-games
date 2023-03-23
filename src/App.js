import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductList from './components/ProductList';
import ProductDetails from './pages/GameDetailsPage';
import CartPage from './pages/CartPage';
import Toast from './components/Toast';
import { useCart } from './contexts/CartContext';

function App() {
  const { toast } = useCart();
  return (
    <Router>
          <Toast message={toast.message} show={toast.show} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
