import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchFilterBar from '../components/SearchFilterBar';
import Pagination from '../components/Pagination';
import ProductForm from '../components/ProductForm';
import ProductModal from '../components/ProductModal';
import { Toaster, toast } from 'sonner';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  // ✅ NEW: Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ NEW: Persist favorites when changed
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // ✅ NEW: Toggle favorite state
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetch('https://mock-data-josw.onrender.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => toast.error('Failed to fetch products'));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://mock-data-josw.onrender.com/products/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Product deleted');
      })
      .catch(() => toast.error('Delete failed'));
  };

  const handleEdit = (product) => {
    setEditData(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditData(null);
    setShowForm(true);
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-4">
        <SearchFilterBar products={products} setFiltered={setFiltered} />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice((page - 1) * perPage, page * perPage).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onClick={() => setSelectedProduct(product)}

            // ✅ NEW props for favorites
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <Pagination total={filtered.length} perPage={perPage} page={page} setPage={setPage} />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {showForm && (
        <ProductForm
          product={editData}
          onClose={() => setShowForm(false)}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
