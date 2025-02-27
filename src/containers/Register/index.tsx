/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button, Datepicker, Modal } from '@/components/commons'
import Select from 'react-select'
import { Formik, Field, Form } from 'formik'
import { FC, useState, useEffect } from 'react'
import { useQueriesGetProvince, getDistrict, getCity } from '@/api/address'
import toast from 'react-hot-toast'
import { useRegisterMutation, RegisterParams } from '@/api/auth'
import { customStyles } from '@/helpers/config'
import { RegisterProps } from '@/types/containers/register'

const RegisterModule: FC<RegisterProps> = ({setOnOpen, onOpen}) => {
    const [provId, setProvId] = useState<string | undefined>()
    const [idCity, setProvCity] = useState<string | undefined>()
    const postRegister = useRegisterMutation()

    const [cityData, setCityData] = useState<{ value: string; label: string }[]>([])
    const [districtData, setDistrictData] =useState<{ value: string; label: string }[]>([])

    const province = useQueriesGetProvince()?.data ?? {}
    const provinceOptions = Object.values(province as { id: string; name: string }[])?.map((item) => ({
        value: item.id,
        label: item.name,
    }))
    
    useEffect(() => {
        if (provId) {
            getCity(provId).then((res) => {
                return setCityData(Object.values(res as { id: string; name: string}[])?.map((item) => ({
                    value: item.id,
                    label: item.name,
            })))
          }).catch(() => undefined);
        }
    }, [provId])
    
    useEffect(() => {
        if (idCity) {
            getDistrict(idCity).then((res) => {
                return setDistrictData(Object.values(res as { id: string; name: string}[])?.map((item) => ({
                    value: item.id,
                    label: item.name,
            })))
          }).catch(() => undefined);
        }
    }, [idCity])

    const handleOnSubmit = async (values: RegisterParams) => {
        try {
            const params = {
                username: values?.username ?? '',
                email: values?.email ?? '',
                no_telepon: String(values?.no_telepon),
                province: values?.province,
                birth_date: values?.birth_date,
                city: values?.city,
                district: values?.district,
                gender: values?.gender,
                password: values?.password,
                post_code: values?.post_code ?? ''
            }

            await postRegister.mutateAsync(params as RegisterParams)
                .then((res) => {
                    toast.success(res.message)
                    setTimeout(() => window.location.href ='/', 1000)
                })
            
        } catch (error) {
            const { data } = error as { data: { error: string } }
            toast.error(data.error)
        }
     }

    const customStyle = {
        section: 'flex flex-col',
        label: 'block mb-2 text-sm font-medium text-gray-700',
        input: 'w-full bg-[#FFF] rounded border-2 border-[#DEDEDE] text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
    }

    const onClose = () => {
        setOnOpen?.(false)
    }

    return (
        <Modal
            isOpen={onOpen}
            onClose={onClose}
            size='doubleLarge'
            title='Registration'
            iconClose={true}
        >
          <div className=''>
            <Formik
                enableReinitialize
                initialValues={{
                    username:  '',
                    email: '',
                    no_telepon: '',
                    birth_date: '',
                    province: '',
                    city: '',
                    district: '',
                    gender: '',
                    password: '',
                    post_code: ''
                }}
                onSubmit={handleOnSubmit}
            >
            {({ setFieldValue }) => {
                return (
                    <Form className='space-y-5'>
                        <div className='flex space-x-3'>
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Nama Lengkap</label>
                                <Field type='text' name='username' placeholder='Masukan nama anda' className={`${customStyle.input}`} />
                            </div>
                            
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Email</label>
                                <Field type='email' name='email' placeholder='Masukan email anda' className={`${customStyle.input}`} />
                            </div>
                        </div>

                        <div className='flex space-x-3'>
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>No. Telepone</label>
                                <Field type='number' name='no_telepon' placeholder='Masukan no telepone anda' className={`${customStyle.input}`} />
                            </div>
                            
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Jenis Kelamin</label>
                                    <label className='flex gap-1 text-sm'>
                                    <Field type="radio" name="gender" value="Laki laki" />
                                        Laki laki
                                    </label>
                                    <label className='flex gap-1 text-sm'>
                                        <Field type="radio" name="gender" value="Perempuan" />
                                        Perempuan
                                </label>
                            </div>
                        </div>

                        <div className='flex space-x-3'>
                            <div className={`flex-1 ${customStyle.section}`}>
                            <Datepicker
                                label="Tanggal Kelahiran"
                                minDate={new Date(1900, 0, 1)}
                                maxDate={new Date()}
                                onChange={(date: Date) => setFieldValue('birth_date', date.toISOString())}
                                />
                            </div>
                            
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Provinsi</label>
                                <Select
                                    options={provinceOptions}
                                    placeholder='Pilih Provinsi'
                                    styles={customStyles}
                                    onChange={(e: any) => {
                                        setFieldValue('province', e?.label)
                                        setProvId(e?.value)
                                    }}
                                />
                                </div>
                        </div>

                        <div className='flex space-x-3'>
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Kota</label>
                                <Select
                                    options={cityData}
                                    placeholder='Pilih Kota'
                                    styles={customStyles}
                                    onChange={(e : any) => {
                                        setFieldValue('city', e?.label)
                                        setProvCity(e?.value)
                                    }}
                                />
                            </div>
                            
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Kecamatan</label>
                                <Select 
                                    placeholder='Pilih Kecamatan' 
                                    options={districtData} 
                                    styles={customStyles}
                                    onChange={(e : any) => setFieldValue('district', e?.label)} 
                                />
                                </div>
                        </div>

                        <div className='flex space-x-3'>
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Kode Pos</label>
                                <Field type='text' name='post_code' placeholder='Masukan kode pos anda' className={`${customStyle.input}`} />
                            </div>
                            
                        </div>

                        <div className='flex space-x-3'>
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Password</label>
                                <Field type='text' name='password' placeholder='Masukan password anda' className={`${customStyle.input}`} />
                            </div>
                            
                            <div className={`flex-1 ${customStyle.section}`}>
                                <label className={`${customStyle.label}`}>Konfirmasi Password</label>
                                <Field type='text' name='confirm_password' placeholder='Ulangi password anda' className={`${customStyle.input}`} />
                                </div>
                        </div>


                        
                        <div className='flex w-full justify-end gap-3'>
                            <Button type='button' size='sm' text='Cancel' variant='secondary' onClick={() => window.location.href ='/'} />
                            <Button type='submit' size='sm' text='Simpan' variant='success' />
                        </div>
                    </Form>
                   )
                }}
             </Formik>
            </div>
         </Modal>
    )
}

export default RegisterModule