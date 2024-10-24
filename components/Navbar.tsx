import React, { useCallback, useEffect, useState } from 'react'
import { BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import NavItem from './NavItem'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'

const Navbar = () => {
    const [MobileMenuItem, setMobileMenu] = useState(false);
    const [AccountMenuItem, setAccountMenuItem] = useState(false);
    const [showBack, setShowBack] = useState(false);

    const topOffSet = 65;

    useEffect(() => {
        const handleScrool = () => {
            if (window.scrollY >= topOffSet) {
                setShowBack(true)
            }else{
                setShowBack(false)
            }
        }
        window.addEventListener('scrool',handleScrool);
        return()=>{
            window.removeEventListener('scroll',handleScrool)
        }
    },[])

    const toogleMobileMenu = useCallback(() => {
        setMobileMenu((current) => !current);
    }, [])

    const toogleAccountMenu = useCallback(() => {
        setAccountMenuItem((current) => !current);
    }, [])

    return (
        <nav className='w-full fixed z-20' >
            <div className={`px-4 py-6 flex flex-row items-center transition ${showBack ? 'bg-zing-950 bg-opacity-95':''}`} >
                <img src="/images/logo.png" className='lg:h-8 h-6 cursor-pointer' alt="" />
                <div className='flex-row lg:flex hidden gap-7 ml-12'>
                    <NavItem name='Home' active ></NavItem>
                    <NavItem name='Films'  ></NavItem>
                    <NavItem name='Series'  ></NavItem>
                    <NavItem name='New & Popular'  ></NavItem>
                    <NavItem name='My List'  ></NavItem>
                    <NavItem name='Browse My Languages'  ></NavItem>
                </div>
                <div onClick={toogleMobileMenu} className='relative lg:hidden flex flex-row items-center gap-2 ml-6 cursor-pointer' >
                    <p className='text-white' >Browse</p>
                    <ChevronDownIcon className='w-5 text-white' ></ChevronDownIcon>
                    <MobileMenu visible={MobileMenuItem} ></MobileMenu>
                </div>

                <div className='flex flex-row ml-auto gap-7 items-center' >
                    <div className='cursor-pointer' >
                        <MagnifyingGlassIcon className='w-5 text-white' ></MagnifyingGlassIcon>
                    </div>
                    <div className='cursor-pointer' >
                        <BellIcon className='w-5 text-white' ></BellIcon>
                    </div>
                    <div onClick={toogleAccountMenu} className='cursor-pointer relative flex flex-row ml-auto items-center' >
                        <div className='w-8 h-8 lg:w-12 lg:h-12 rounded-lg overflow-hidden'>
                            <img src="/images/default-red.png" alt="" />
                        </div>
                        <ChevronDownIcon className='w-5 text-white' ></ChevronDownIcon>
                        <AccountMenu visible={AccountMenuItem} ></AccountMenu>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar