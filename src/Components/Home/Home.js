import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase.config';
import Loading from '../Loading/Loading';

// import fireDb from 'firebase/compat/app'


import { GoThreeBars } from 'react-icons/go';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import PersonalInfo from './PersonalInfo';

const Home = () => {
    const [users, setUsers] = useState([])  
    const [loading, setLoading] = useState(false)
    const [singleUser, SetSingleUser] = useState({})
    const [sortedData, setSortedData] = useState([])
    const [sort, setSort] = useState(false)


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
                SetSingleUser(list[list.length-1])
                setLoading(false)
            }
        )

        return () => {
            unsub();
        }

    }, [])

    console.log(users)
    

    const currentUser = (user) => {
        
        SetSingleUser(user)
        

    }

    const handleChange = (e) => {
        // setSort(true);
        // fireDb.child("users").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
            
        //     let sortedData = [];
        //     snapshot.forEach((snap) => {
        //         sortedData.push(snap.val())
        //     });
        //     setSortedData(sortedData)
        // })
        
    }

    

    if (loading) {
        return <Loading></Loading>
    }
console.log(sortedData)
    return (

        <div className='h-[100vh] '>



            <div className='grid grid-cols-5'>


                <div className='col-span-3 '>
                    <div className=''>
                        {
                            singleUser &&
                            <div className='grid grid-cols-2 gap-4  '>

                                    <div className='flex gap-5 '>

                                    <div className='bg-[#00B8F1]  h-[300vh] w-12 text-gray-300 text-2xl font-semibold'>
                                        <GoThreeBars className='mt-5 ml-2' />
                                        <BiLogIn className='ml-2 mt-[70vh]' />
                                    </div>
                                    <div className='mt-12'>
                                        <p className='text-lg font-bold'>{singleUser?.id}</p>

                                        <p className='text-lg font-bold'>Person Detected</p>

                                            <PersonalInfo
                                            singleUser={singleUser}></PersonalInfo>
                                    </div>

                                </div>

                                <div className='mt-2'>
                                        <p className='text-xl font-semibold  my-5  w-[90%] mx-auto'> {singleUser?.gender} </p>
                                    <img src={singleUser?.img} alt="" className='border-8 border-gray-400 w-[90%] mx-auto md:h-[70vh] rounded-lg' />
                                </div>





                            </div>
                        }
                    </div>


                </div>

                <div className='border-4 border-[#D9D9D9] col-span-2 min-h-screen'>
                    <div className=' px-4 flex justify-between items-center font-bold text-2xl'>
                        <p>Events</p>

                        <div className="dropdown dropdown-left">
                            <label tabIndex={0} className=" cursor-pointer m-1"><HiOutlineAdjustmentsHorizontal className='text-3xl'/></label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm">
                                <li> <Link to='/AddInfo'>
                                    Add Contact

                                </Link></li>
                                <li>
                                    <select onChange={handleChange} >
                                        <option value={''} disabled hidden selected required> Please Select One</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="location">Location</option>
                                        <option value="date">Date</option>
                                    </select>

                                   

                                </li>
                            </ul>
                        </div>
                       
                    </div>

                    <div className='mt-5 '>
                        {
                            users.map(user => <UserCard
                                key={user.id}
                                user={user}
                                currentUser={currentUser}
                                
                            ></UserCard>)
                        }
                    </div>




                </div>

            </div>

        </div>
    );
};

export default Home;