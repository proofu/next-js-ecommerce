"use client";
import { Category, Product } from "@prisma/client/edge";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// const res = await fetch('http://localhost:3000/api/products/')
// const productsFromDB = await res.json()

const Page = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);  

  const [productsSearch, setProductSearch] = useState([]);
  const [search, setSearch] = useState("");

  const [productsCategorySearch, setProductCategorySearch] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchProducts = async (page: number) => {
    const res = await fetch(
      `http://localhost:3000/api/products?page=${page}&limit=9`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchCategories = async () => {
    const res = await fetch(`http://localhost:3000/api/categories`);
    const data = await res.json();
    setCategories(data.categories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    setSelectedCategory(0);
  }, []);
  const fetchProductsByCategory = async (categoryId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products?categoryId=${categoryId}`
      );
      const data = await res.json();
      // setProducts(data.products);
      setProductCategorySearch(data.products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };
  useEffect(() => {
    if (selectedCategory !== null) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchProductsSearch = async (search: string) => {
    const res = await fetch(
      `http://localhost:3000/api/products?search=${search}`
    );
    const data = await res.json();
    setProductSearch(data.products);
    setProducts(data.products);
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchProductsSearch(e.target.value);
  };

  let displayedProducts = products; 

if (search) {
  displayedProducts = productsSearch; 
} else if (selectedCategory) {
  displayedProducts = productsCategorySearch;
}

  return (
    <>
      <div className="flex">
        {/* Sidebar with categories */}
        <aside className="w-1/4 p-4 bg-gray-800 text-white min-h-screen">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category: Category) => (
              <li key={category.name}>
                <button
                  onClick={() => setSelectedCategory(category.id)} // Use category.id instead of category.name
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedCategory === category.id
                      ? "bg-blue-500"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 p-4">
          {/* Search Input */}
          <div className="flex justify-center p-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {displayedProducts.map((p: Product) => (
              <div
                key={p.name}
                className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  width={200}
                  height={200}
                  src={p.imageUrl || "/images/not-available.jpg"}
                  alt={p.name}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h2>
                  <p className="text-gray-600 text-sm">${p.price}</p>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-4 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>

            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
