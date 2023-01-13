import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase.config';
import Loading from '../Loading/Loading';

const Home = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


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
                setLoading(false)
            }
        )

        return () => {
            unsub();
        }

    },[])

    console.log(users)

    return (

        <div>

            {
                loading && 
                <Loading  ></Loading>
            }
            <h1> Hello World</h1>
        </div>
    );
};

export default Home;