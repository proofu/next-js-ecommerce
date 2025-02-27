import Link from 'next/link';
import React from 'react'

const Categories = ["Zapatos", "Ropa", "Accesorios", "Indumentaria deportiva"];


const page = () => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
        {/* <img className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Category 1"/> */}
        {Categories.map((category) => (
          <Link key={category} href={`/categories/${category}`}>
          <div key={category} className="p-4 text-center bg-white shadow-lg rounded-lg hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
          </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default page
