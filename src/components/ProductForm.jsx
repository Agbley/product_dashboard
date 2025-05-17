import React, { useState } from 'react';
import { toast } from 'sonner';

export default function ProductForm({ product, onClose, setProducts }) {
  const [form, setForm] = useState(product || { name: '', price: '', category: '', description: '', rating: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = product ? 'PUT' : 'POST';
    const url = product ? `https://mock-data-josw.onrender.com/products/${product.id}` : 'https://mock-data-josw.onrender.com/products';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), rating: parseFloat(form.rating) })
    })
      .then(res => res.json())
      .then(data => {
        setProducts(prev => product ? prev.map(p => (p.id === product.id ? data : p)) : [...prev, data]);
        toast.success(product ? 'Product updated' : 'Product created');
        onClose();
      })
      .catch(() => toast.error('Failed to save product'));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg  w-96 shadow-lg space-y-3">
        <h2 className="text-xl font-bold">{product ? 'Edit Product' : 'New Product'}</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded" type="number" step="0.01" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="w-full p-2 border rounded" />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" required className="w-full p-2 border rounded" type="number" step="0.1" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded"></textarea>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
