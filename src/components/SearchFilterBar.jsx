import React, { useEffect, useState } from 'react';

export default function SearchFilterBar({ products, setFiltered }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://mock-data-josw.onrender.com/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    let data = [...products];
    if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) data = data.filter(p => p.category === category);
    if (sort === 'asc') data.sort((a, b) => a.price - b.price);
    if (sort === 'desc') data.sort((a, b) => b.price - a.price);
    setFiltered(data);
  }, [search, category, sort, products]);

  return (
    <div className="flex gap-2">
      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border p-2 rounded" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
        <option value="">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded">
        <option value="">Sort</option>
        <option value="asc">Price Low → High</option>
        <option value="desc">Price High → Low</option>
      </select>
    </div>
  );
}
