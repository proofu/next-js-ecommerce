import React from 'react'

const page = () => {
    return (
        <div>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center">
                <img className="w-32 h-32 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="Profile Picture"/>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h2>
                    <p className="text-gray-600">johndoe@example.com</p>
            </div>

        </div>
    )
}

export default page
