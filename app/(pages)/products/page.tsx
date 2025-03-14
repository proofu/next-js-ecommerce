"use client";
import { Product } from "@prisma/client/edge";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// const res = await fetch('http://localhost:3000/api/products/')
// const productsFromDB = await res.json()

const page = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async (page) => {
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {products.map((p: Product) => (
          <div
            key={p.name}
            className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Image width={200} height={200} src={p.imageUrl} alt={p.name} />
            {/* <img className="w-full h-48 object-cover" src={p.imageUrl} alt={p.name} /> */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
              <p className="text-gray-600 text-sm">${p.price}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
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
    </>
  );
};

export default page;
