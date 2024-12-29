'use client'

import { Button, Card } from '@/components/commons'
import { Formik, Field, Form } from 'formik'
import { FC, useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useLoginAdminMutation } from '@/api/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

const LoginAdminPage: FC = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const login = useLoginAdminMutation()

  const onSubmit = async (values: { email: string; password: string }) => {
    const params = {
      email: values?.email,
      password: values?.password
    }

    await login
      .mutateAsync(params).then((res) => {
        toast.success(res.message)
        setCookie('token', res?.token)
        router.push('/admin/user-management')
      })

  };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Card title='Login Admin' description='' className='w-1/4'>
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
            
                 <div className='w-full mt-4'>
                  <Button type='submit' text='Submit' variant='primary' size='md' className='w-full' />
                 </div>
                </Form>
              )}
            </Formik>
        </Card>
    </div>
    )
}

export default LoginAdminPage