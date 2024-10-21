import React, { useCallback, useState } from 'react'
import Input from '@/components/input'
import { FaGoogle,FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { NextPageContext } from 'next';
import { redirect } from 'next/dist/server/api-utils';

export async function getServerSideProps(context:NextPageContext) {
    const session = await getSession(context);

    if(session){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    return{
        props:{}
    }
}

const auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');
    const router = useRouter();

    const toogleVariant = useCallback(()=>{
        setVariant((currentVariant)=>currentVariant==='login'?'register':'login')
    },[])

    const login = useCallback(async ()=> {
        try {
            await signIn('credentials',{
                email,
                password,
                redirect:false,
                callbackUrl: '/'
            })
            router.push('/profiles');
        } catch (error) {
            console.log(error);
        }
    },[email,password,router])

    const register = useCallback(async ()=> {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password,
            });

            login();
        } catch (error) {
            console.log(error);
        }
    },[email,password,router])

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover" >
        <div className='bg-black h-full w-full bg-opacity-45'>
            <nav className='px-12 py-6' >
                <img src="/images/logo.png" className='h-12'  alt="" />
            </nav>
            <div className='flex justify-center'>
                <div className='bg-black bg-opacity-85 px-20 py-20 self-center mt-2 rounded-xl w-full lg:w-2/5'>
                    <h2 className='text-white text-5xl mb-8 font-semibold' >{variant === 'login' ? 'Sing In': 'Register'}</h2>
                    <div className='flex flex-col gap-4'>
                        {variant == 'register' && (
                            <Input id="name" value={name} label='Fullname' onChange={((e:any)=>setName(e.target.value))} type='text' >  
                            </Input>
                        )}
                        
                        <Input id="email" value={email} label='Email Address' onChange={((e:any)=>setEmail(e.target.value))} type='email' >
                         
                        </Input>
                        <Input id="password" value={password} label='Password' onChange={((e:any)=>setPassword(e.target.value))} type='password' >
                         
                        </Input>
                        <button className='bg-red-700 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition' onClick={variant === 'login' ? login : register} >{variant === 'login'?'Login':'Sing Up'}</button>

                        <div className='flex flex-row items-center gap-4 mt-10 justify-center'>
                            <div className='flex text-red-600 w-10 h-10 rounded-full items-center justify-center cursor-pointer bg-white' >
                                <FaGoogle size={30} ></FaGoogle>
                            </div>
                            <div className='flex text-black w-10 h-10 rounded-full items-center justify-center cursor-pointer bg-white' >
                                <FaGithub size={30} ></FaGithub>
                            </div>
                        </div>
                        <p className='text-neutral-600 mt-12'>
                            {variant == 'login' ? 'First time usin Netflix?': 'Allready have an account'}
                            <span onClick={toogleVariant} className='text-white ml-2 cursor-pointer hover:underline transition' >
                               {variant === 'login'? 'Create an account':'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default auth