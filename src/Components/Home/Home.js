import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase.config';
import Loading from '../Loading/Loading';


import { GoThreeBars } from 'react-icons/go';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const Home = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [singleUser, SetSingleUser] = useState({})


    useEffect(() => {
        
        setLoading(true)
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({...doc.data()})
                })
                setUsers(list)
                SetSingleUser(list[0])
                setLoading(false)
            }
        )

        return () => {
            unsub();
        }

    },[])

    console.log(users)
  

    if (loading) {
        return <Loading></Loading>
    }

    return (

        <div>

           
            
            <div className='grid grid-cols-5'>
            
                   
                    <div className='col-span-3'>
                        <div>
                            {
                                singleUser &&
                            <div className='grid grid-cols-2'>
                                    
                                    <div className='flex gap-5'>

                                        <div className='bg-sky-300 p-4 min-h-screen w-10'>
                                            
                                        </div>
                                        <div className='mt-12'>
                                            <p className='text-lg font-bold'>{singleUser.id}</p>

                                            <p className='text-lg font-bold'>Person Detected</p>
                                        </div>

                                    </div>

                                    <div className='mt-5'> 
                                        <p className='text-lg font-semibold text-center my-5'> {singleUser?.gender} </p>
                                        <img src={singleUser?.img} alt="" className='border-4 border-blue-500 w-[90%] mx-auto h-96 rounded-lg' />
                                    </div>
                                        

                                        
                                       

                                </div>
                            }
                        </div>
                       

                    </div>
           
                <div className='border-4 border-[#D9D9D9] col-span-2 min-h-screen'>
                    <div className='pt-3 px-4 flex justify-between items-center font-bold text-2xl'>
                        <p>Events</p>

                        <Link to='/AddInfo'>

                            <GoThreeBars />
                        </Link>
                    </div>

                    <div className='mt-5'>
                        {
                            users.map(user => <UserCard
                            user={user}
                            ></UserCard>)
                        }
                    </div>




                </div>

            </div>

        </div>
    );
};

export default Home;