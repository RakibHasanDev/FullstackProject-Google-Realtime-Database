import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/firebase.config";

export const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [singleUser, SetSingleUser] = useState({})
    const [users, setUsers] = useState([]) 

    useEffect(() => {

        setLoading(true)
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ ...doc.data() },

                    )
                })
                setUsers(list)
                SetSingleUser(list[list.length - 1])
                setLoading(false)
            }
        )

        return () => {
            unsub();
        }

    }, [])

    let male = 0
    let female = 0
    for (let user of users) {
        if (user.gender === "Male") {
            male = male + 1;
        }

        if (user.gender === "Female") {
            female = female + 1;
        }
    }


    return (
        <div class="px-4 py-3 mx-auto w-full md:px-24 lg:px-8 bg-[#001C7B] ">
            <div class="relative flex items-center justify-between">
                <Link to='/'>
                    <h1 className="text-2xl font-bold text-[#007982]"> <span className="text-3xl">S</span>ECQUR<span className="text-red-600">AI</span>SE</h1>
                </Link>
                <ul class="flex items-center hidden space-x-8 lg:flex">
                    {/* <li>
                        <Link
                            to='/AddInfo'
                            aria-label="Our product"
                            title="Our product"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 text-white"
                        >
                            Add Information
                        </Link>
                    </li> */}

                    <li>
                        <p className="px-4 py-2 bg-[#92D050] rounded-md text-white font-semibold">
                            {male}

                        </p>
                    </li>
                    <li>
                        <p className="px-4 py-2 bg-[#FF1717] rounded-md text-white font-semibold">
                            {female}

                        </p>
                        
                    </li>
                   
                </ul>
                <div class="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div class="absolute top-0 left-0 w-full">
                            <div class="p-5 bg-[#001C7B] border rounded shadow-sm">
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        <a
                                            href="/"
                                            aria-label="Company"
                                            title="Company"
                                            class="inline-flex items-center"
                                        >
                                            <Link to='/'>
                                                <h1 className="text-2xl font-semibold text-[#007982]"> <span className="text-3xl">S</span>ECQUR<span className="text-red-600">AI</span>SE</h1>
                                            </Link>
                                        </a>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    {/* <ul class="space-y-4">
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="Our product"
                                                title="Our product"
                                                class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Product
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="Our product"
                                                title="Our product"
                                                class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Features
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="Product pricing"
                                                title="Product pricing"
                                                class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                Pricing
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                aria-label="About us"
                                                title="About us"
                                                class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                                            >
                                                About us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                                aria-label="Sign up"
                                                title="Sign up"
                                            >
                                                Sign up
                                            </a>
                                        </li>
                                    </ul> */}

                                    <ul class="space-y-4">
                                        <li>
                                            <Link
                                                to='/AddInfo'
                                                aria-label="Our product"
                                                title="Our product"
                                                class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 text-white"
                                            >
                                                Add Information
                                            </Link>
                                        </li>
                                        <li>
                                            <p className="p-4 bg-yellow-400 rounded-md">
                                                25
                                                
                                          </p>
                                        </li>
                                        <li>
                                            <p>
                                                
                                          </p>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};