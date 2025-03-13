import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'


const Register = () => {

    const navigate = useNavigate()
        const [showpassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const initailState = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }
    const [value, setValue] = useState(initailState)


    const handleChangeInputs = (e) => {
        const { name, value } = e.target
        setValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const validate = () => {
        let newErrors = {};

        if (!value.first_name.trim()) {
            newErrors.first_name = "First name is required."
        }
        if (!value.last_name.trim()) {
            newErrors.last_name = "last name is required."
        }
        if (!value.email.trim()) {
            newErrors.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
            newErrors.email = 'Enter a valid email.'
        }
        if (!value.password.trim()) {
            newErrors.password = 'Password is reuired.'
        } else if (value.password.length < 8) {
            newErrors.password = 'password must be at least 8 charachter.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleRegisterForm = async (e) => {
        e.preventDefault()
        console.log(value)
        if (!validate()) {
            return
        }

        try {
            const response = await fetch("https://visarshop.aiodevstaging.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value)
            })

            const responseValue = await response.json()
            if (responseValue.data) {
                toast.success('Registration Successfully')
                navigate('/')

            } else {
                toast.error('Registration Failed')
            }


        } catch (error) {
            console.error(error)
            toast.error("Something went wrong");
        }
    }


    return (
        <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
            <div className="container h-full p-10">
                <div
                    className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div
                            className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">

                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">

                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                alt="logo" />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                We are The Lotus Team
                                            </h4>
                                        </div>

                                        <form className='space-y-4' onSubmit={handleRegisterForm}>
                                            <p className="mb-4">Please register an account</p>
                                            <div className="">
                                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your First Name</label>
                                                <input
                                                    type="text"
                                                    name='first_name'
                                                    value={value.first_name}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required=""
                                                    onChange={handleChangeInputs} />
                                                {errors.first_name && <p className='text-white'>{errors.first_name}</p>}
                                            </div>

                                            <div className="">
                                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Last Name</label>
                                                <input
                                                    type="text"
                                                    name='last_name'
                                                    value={value.last_name}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required=""
                                                    onChange={handleChangeInputs} />
                                                {errors.last_name && <p className='text-white'>{errors.last_name}</p>}
                                            </div>

                                            <div className="">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                <input
                                                    type="email"
                                                    name='email'
                                                    value={value.email}
                                                    onChange={handleChangeInputs}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                                {errors.email && <p className='text-white'>{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type={showpassword ? "text" : "password"} name="password" value={value.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChangeInputs} />
                                                <span className="" onClick={() => setShowPassword(!showpassword)}>
                                                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                                {errors.password && <p className='text-white'>{errors.password}</p>}
                                            </div>


                                            <div>
                                                <button type="submit" className="w-[100px] text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer  ">Sign up</button>
                                            </div>

                                            <div>
                                                <p className="text-sm font-light text-white">
                                                    Already have an account?
                                                    <Link to={'/'} href="" className="font-medium text-white hover:underline dark:text-primary-500 cursor-pointer">Sign in</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-[##ee7724]">
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            We are more than just a company
                                        </h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register