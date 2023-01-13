import React from 'react';

const UserCard = ({ user }) => {
    
    const {  location, id, Timestamp } = user
  
    return (
        <div
        
            className='w-11/12 mx-auto bg-[#D9D9D9] my-3.5 px-5 py-4 rounded-sm text-md font-semibold cursor-pointer hover:bg-[#7F7F7F] hover:text-white'>
            <div className='flex justify-between items-center'>
                <p> {location} : {id} </p>
                <p>{Timestamp.toDate().toLocaleString()}</p>
            </div>
            <p className='mt-3'>Person Detected</p>
        </div>
    );
};

export default UserCard;