import { Product } from "@prisma/client/edge";
import Image from "next/image";
import React from "react";

const res = await fetch('http://localhost:3000/api/products/')
const productsFromDB = await res.json()



const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {productsFromDB.products.map((p) => (
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
    </>
  );
};

export default page;
