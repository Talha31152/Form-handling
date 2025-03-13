// import React, { useState } from 'react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router'

// const Home = () => {

//     const items = [
//         {
//             id: 1,
//             name: "Talha",
//             email: "Talha@gmail.com",
//             password: "Talha@123"
//         },
//         {
//             id: 2,
//             name: "Jameel",
//             email: "Jameel@gmail.com",
//             password: "Jameel@123"
//         },
//         {
//             id: 3,
//             name: "Zeeshan",
//             email: "Zeeshan@gmail.com",
//             password: "Zeeshan@123"
//         },
//         {
//             id: 4,
//             name: "Atlas",
//             email: "Atlas@gmail.com",
//             password: "Atlas@123"
//         },
//         {
//             id: 5,
//             name: "Huzaifa",
//             email: "Huzaifa@gmail.com",
//             password: "Huzaifa@123"
//         }
//     ]

//     const [products, setProducts] = useState([])

//     const navigate = useNavigate()
//     const user = JSON.parse(localStorage.getItem('user'))

//     const handleLogout = async (e) => {
//         localStorage.removeItem('user')
//         navigate('/')
//         toast.success('Logout successful')
//     }

//     const handleProducts = async (e) => {
//         try {
//             const response = await fetch("https://visarshop.aiodevstaging.com/api/products/all/", {
//                 method: "GET",
//                 headers: {
//                     "Client-Type": "application/json"
//                 },
//             })
//             const responsedata = await response.json();
//             setProducts(responsedata.data.products)
//             console.log(responsedata.data.products)
//         } catch {
//             console.error("Error fetching products:", error);
//             toast.error("Failed to load products");
//         }
//     }



//     return (
//         user && (
//             <div className='space-y-2'>
//                 <p>this is my {user.data.first_name}</p>


//                 {
//                     products.map((items, index) => (
//                         <p key={index}>
//                             {items.title}
//                         </p>

//                     ))
//                 }

//                 <div className='space-y-6 mt-4'>
//                     <div>
//                         <button onClick={handleProducts} className="w-[100px] text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">Products</button>
//                     </div>

//                     <div>
//                         <button onClick={handleLogout} className="w-[100px] text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">logout</button>
//                     </div>
//                 </div>
//             </div>

//         )
//     )
// }

// export default Home









import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4); // Show 8 products initially (2 rows)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch products from API
    const handleProducts = async () => {
        try {
            const response = await fetch("https://visarshop.aiodevstaging.com/api/products/all/", {
                method: "GET",
                headers: {
                    "Client-Type": "application/json"
                },
            });
            const responsedata = await response.json();
            setProducts(responsedata.data.products || []); // Handle cases where data might be empty
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products");
        }
    };

    // Auto-fetch products when the component loads
    useEffect(() => {
        handleProducts();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        toast.success('Logout successful');
    };

    // Show more products
    const showMoreProducts = () => {
        setVisibleCount((prev) => prev + 8); // Load 8 more products
    };

    return (
        user && (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome, {user.data.first_name}</h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.slice(0, visibleCount).map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow-md bg-white">
                            <img src={`https://visarshop.aiodevstaging.com/api/${item.images[0]}`} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                            <p className="text-gray-600 mt-1">${item.sizes[0].price}</p>
                            <p className="text-gray-600 mt-1">${item.sizes[0].size}</p>

                            <p className="text-gray-500 text-sm mt-2">{item.description}</p>
                            <button
                                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}

                {visibleCount < products.length && (
                    <div className="text-center mt-6">
                        <button
                            onClick={showMoreProducts}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Show More
                        </button>
                    </div>
                )}

                {/* Logout Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    );
};

export default Home;
