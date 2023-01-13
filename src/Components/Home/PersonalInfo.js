import React from 'react';

const PersonalInfo = ({singleUser}) => {
    return (
        <div className='mt-[10vh] space-y-1 font-semibold'>
            <p>Name: {singleUser?.name}</p>
            <p>Location: {singleUser?.location}</p>
            <p> Date: {singleUser?.Timestamp?.toDate().toLocaleString().slice(0, 11)} </p>
            <p> Time:: {singleUser?.Timestamp?.toDate().toLocaleString().slice(11, 24)} </p>

            <div className='pt-10 '>
                <p>
                    Description: <br /> {singleUser?.name} Detected at {singleUser?.location} on { singleUser?.Timestamp?.toDate().toLocaleString()}
                </p>
            </div>

           
            
        </div>
    );
};

export default PersonalInfo;