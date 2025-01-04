'use client';

import { Modal, Button } from '@/components/commons'
import { FC, useState, useCallback } from 'react'
import { LoginProps } from '@/types/containers/login'
import { Formik, Form, Field } from 'formik'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import Image from 'next/image'
import { useLoginMutation } from '@/api/auth'
import { useGlobalState } from '@/context/authContextProvider'
import toast from 'react-hot-toast'

const Login: FC<LoginProps> = ({ isOpen, setIsOpen }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { afterSuccessLogin } = useGlobalState()
  const loginEndpoint = useLoginMutation()

  
  const onSubmit = useCallback(async (values: { email: string; password: string }) => {
    const params = {
      email: values?.email,
      password: values?.password
    }

    try {
      const res = await loginEndpoint.mutateAsync(params)
      setIsOpen(false)
      setTimeout(() => {
        window.location.reload()
        toast.success(res.message)
        afterSuccessLogin(res.token, res.user)
      }, 300)
    } catch (err) {
      const message =  `Login gagal, silakan coba lagi. ${(err as Error)?.message}`
      throw new Error(message)
    }
   
  }, [afterSuccessLogin, loginEndpoint, setIsOpen])

  return (
    <Modal
      title="Masuk"
      isOpen={isOpen}
      size='small'
      onClose={() => setIsOpen(false)}
    >
      <Formik
        enableReinitialize
        initialValues={{
          email: '', 
          password: '', 
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className='flex flex-col gap-3'>
            <div className="flex flex-col gap-1">
              <label className="text-sm">
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Masukan email"
                className="w-full text-sm bg-white rounded border border-gray-300 focus:outline-none outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">
                Password
              </label>
              <div className='w-full text-sm flex items-center gap-2 bg-white rounded border border-gray-300 focus:outline-none outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukan password"
                  className="w-full outline-none"
                />
                <span
                  className='text-2xl cursor-pointer opacity-60'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEye className='text-md' /> : <AiFillEyeInvisible className='text-md' />}
                </span>
              </div>
            </div>

            <span className='w-full text-center text-sm opacity-50 my-2'>Atau</span>
            
            {/* Google Login */}
            <div
              className='flex items-center border-2 py-2 justify-center rounded-md cursor-pointer bg-gray-100 tracking-wide'
            >
              <Image src='/logo/google.png' width={25} height={25} alt='google-logo' />
              <span className='text-sm'>Log in with Google</span>
            </div>
            
            <div className='w-full mt-4'>
              <Button type='submit' text='Submit' variant='success' size='md' className='w-full' />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { Login };
