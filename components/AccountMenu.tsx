import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import React from 'react'

interface accountProp {
    visible?: boolean;
}

const AccountMenu: React.FC<accountProp> = ({ visible }) => {
    const { data: user } = useCurrentUser();
    if (!visible) {
        return null;
    }

    return (
        <div className='bg-gray-950 w-48 rounded-lg absolute top-8 right-0 py-5 flex-col border-gray-800 flex' >
            <div className='flex flex-col gap-3' >
                <div className='px-3 group flex flex-row gap-3 items-center w-full cursor-pointer' >
                    <img className='w-6' src="/images/default-red.png" alt="" />
                    <p className='text-white text-lg group-hover:underline' >{user?.name}</p>
                </div>
                <hr className='bg-gray-500 border-0 h-px my-4' />
                <div onClick={()=>signOut()} className='px-3 text-white text-center hover:underline cursor-pointer'>Sign Out Netflix</div>
            </div>
        </div>
    )
}

export default AccountMenu