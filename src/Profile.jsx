import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const user = userData.data;
  const [showPassword, setshowPassword] = useState("password");
  const [value, setValue] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    // password: user.password || "",
  });

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://visarshop.aiodevstaging.com/api/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const json = await response.json();
      console.log("Profile", json);
      localStorage.setItem("user", JSON.stringify(json));   
    } catch (error) {
      console.error("Error updating profile: ", error.message);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <p className="mb-4">Update Profile</p>
        <div className="">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={value.first_name}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your name"
            required=""
            onChange={handleChangeInputs}
          />
          {/* {errors.first_name && <p className='text-white'>{errors.first_name}</p>} */}
        </div>

        <div className="">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={value.last_name}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your name"
            required=""
            onChange={handleChangeInputs}
          />
          {/* {errors.last_name && <p className='text-white'>{errors.last_name}</p>} */}
        </div>

        <div className="">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={value.email}
            onChange={handleChangeInputs}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required=""
          />
          {/* {errors.email && <p className='text-white'>{errors.email}</p>} */}
        </div>

        {/* <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={value.password}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={handleChangeInputs}
          />
          <span className="" onClick={() => setshowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className='text-white'>{errors.password}</p>}
        </div> */}

        <div>
          <button
            type="submit"
            className="w-[150px] text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer  "
            // onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
