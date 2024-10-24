import React from 'react';

interface mobilProp {
  visible?: boolean;
}

const MobileMenu: React.FC<mobilProp> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className='bg-gray-950 w-48 rounded-lg absolute top-8 lef-0 py-5 flex-col border-gray-800 flex' >
        <div className='flex flex-col gap-4' >
            <div className='px-3 text-center text-white hover:underline' >
                Home
            </div>
            <div className='px-3 text-center text-white hover:underline' >
                Film
            </div>
            <div className='px-3 text-center text-white hover:underline' >
                New & Popular
            </div>
            <div className='px-3 text-center text-white hover:underline' >
                My List
            </div>
            <div className='px-3 text-center text-white hover:underline' >
                Brose by Languages
            </div>
        </div>
    </div>
  );
};

export default MobileMenu;
