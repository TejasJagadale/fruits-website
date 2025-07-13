import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faShoppingCart, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "../styles/Shop.css"

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample product data - replace with your actual data or API call
  useEffect(() => {
    const sampleProducts = [
      { id: 1, name: 'Apple', price: 120, category: 'Fruits', rating: 4.5, image: 'apple.png', featured: true },
      { id: 2, name: 'Banana', price: 60, category: 'Fruits', rating: 4.2, image: 'banana.png', featured: false },
      { id: 3, name: 'Carrot', price: 40, category: 'Vegetables', rating: 4.0, image: 'carrot.png', featured: true },
      { id: 4, name: 'Tomato', price: 50, category: 'Vegetables', rating: 3.8, image: 'tomato.png', featured: false },
      { id: 5, name: 'Mango', price: 150, category: 'Fruits', rating: 4.7, image: 'mango.png', featured: true },
      { id: 6, name: 'Potato', price: 30, category: 'Vegetables', rating: 3.5, image: 'potato.png', featured: false },
      { id: 7, name: 'Grapes', price: 80, category: 'Fruits', rating: 4.3, image: 'grapes.png', featured: true },
      { id: 8, name: 'Onion', price: 35, category: 'Vegetables', rating: 3.9, image: 'onion.png', featured: false },
    ];

    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
    
    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(sampleProducts.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        result.sort((a, b) => b.featured - a.featured);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortOption, searchQuery, products]);

  const handleAddToCart = (product) => {
    // Add to cart logic (similar to your Home page)
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart');
  };

  return (
    <div className="shop-container">
      {/* Hero Section */}
      <div className="shop-hero">
        <h1>Our Fresh Products</h1>
        <p>Discover the best quality fruits and vegetables</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="shop-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        <div className="mobile-filters">
          <button onClick={() => setShowFilters(!showFilters)}>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
        </div>

        <div className="sort-options">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      <div className="shop-content">
        {/* Sidebar Filters */}
        <div className={`shop-sidebar ${showFilters ? 'mobile-visible' : ''}`}>
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(category => (
              <li
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <h3>Price Range</h3>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="5000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
            <div className="price-values">
              <span>₹0</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          <button 
            className="clear-filters"
            onClick={() => {
              setSelectedCategory('All');
              setPriceRange([0, 5000]);
              setSearchQuery('');
            }}
          >
            Clear All Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {product.featured && <div className="featured-badge">Featured</div>}
                <div className="product-image">
                  <img src={`/fruits/${product.image}`} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-category">{product.category}</div>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon 
                        key={i} 
                        icon={faStar} 
                        className={i < Math.floor(product.rating) ? 'filled' : ''} 
                      />
                    ))}
                    <span>({product.rating})</span>
                  </div>
                  <div className="product-price">₹{product.price}</div>
                  <button 
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <h3>No products found matching your criteria</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;