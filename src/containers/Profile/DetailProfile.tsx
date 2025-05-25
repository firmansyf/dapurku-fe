/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Formik, Form, Field } from "formik"
import { Button, Datepicker } from '@/components/commons'
import { useGlobalState } from "@/context/authContextProvider"
import { useQueriesGetProvince, getDistrict, getCity } from '@/api/address'
import moment from "moment"
import { customStyles as styleSelect } from "@/helpers/config"
import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useUserPutMutation} from '@/api/auth'
import toast from "react-hot-toast"

interface UploadedImage {
    preview: string;
    file: File;
}

export default function DetailProfile() {
    const { state: { data }, dispatch } = useGlobalState()
    const [provId, setProvId] = useState<string | undefined>()
    const [idCity, setProvCity] = useState<string | undefined>()
    const [getCityData, setGetCity] = useState<{ value: string; label: string }>()
    const [profileImage, setProfileImage] = useState<UploadedImage | undefined>()

    const [cityData, setCityData] = useState<{ value: string; label: string }[]>([])
    const [districtData, setDistrictData] = useState<{ value: string; label: string }[]>([])

    const editProfile = useUserPutMutation()
    const province = useQueriesGetProvince()?.data ?? {}
    const provinceOptions = Object.values(province as { id: string; name: string }[])?.map((item) => ({
        value: item.id,
        label: item.name?.toUpperCase(),
    }))

    const filterDataProvince = provinceOptions?.find((item) => item.label?.toUpperCase() === data?.province?.toUpperCase())
    const url = data?.image.data
        ? String.fromCharCode(...data.image.data) 
        : undefined
    
        const onDrop = (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setProfileImage({
                    preview: URL.createObjectURL(file),
                    file,
                })
            }
        }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        },
        maxFiles: 1,
    })

    useEffect(() => {
        if (provId || filterDataProvince?.value) {
            getCity(provId ?? filterDataProvince?.value).then((res) => {
             const result = Object.values(res as { id: string; name: string}[])?.map((item) => ({
                    value: item.id,
                    label: item.name,
             }))
                setCityData(result) 
                setGetCity(result?.find((item) => item.label === data?.city))
            }).catch(() => undefined);
        }
    }, [provId, filterDataProvince?.value, data?.city])
        
    useEffect(() => {
        if (idCity || getCityData?.value) {
            getDistrict(idCity ?? getCityData?.value).then((res) => {
                return setDistrictData(Object.values(res as { id: string; name: string}[])?.map((item) => ({
                    value: item.id,
                    label: item.name,
            })))
            }).catch(() => undefined);
        }
    }, [idCity, getCityData?.value])

    const handleSubmit = async (values : any) => {
        try {
            const formData = new FormData();

            // Append the fields from the form
            Object.keys(values).forEach((key) => {
                if (values[key]) {
                    formData.append(key, values[key]);
                }
            })

            // Handle image data if available
            if (profileImage && profileImage?.file) {
                formData.append('image', profileImage?.file)
            }
            
            await editProfile.mutateAsync({ id: data?.id ?? 0, params: formData as any }).then((res) => {
                toast.success(res.message)
                dispatch({type:'INFO_PROFILE', payload: res.data})
            })
        } catch (err) {
            const { data } = err as { data: { error: string } }
            toast.error(data.error)
        }
     }

    const customStyles = {
        section: '',
        label: 'text-sm w-1/6',
        input: 'flex-1 px-3 py-1 border-2 rounded-md focus:outline-none w-full'
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                username: data?.username,
                email: data?.email,
                no_telepon: data?.no_telepon,
                post_code: data?.post_code,
                gender: data?.gender,
                birth_date: data?.birth_date,
                province: data?.province?.toUpperCase(),
                city: data?.city?.toUpperCase(),
                district: data?.district?.toUpperCase(),
            }}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue }) => {
            return (
                <Form>
                     <div>
                        <div className="flex gap-7">
                          <div className='space-y-3 flex-1'>
                            <div className='flex items-center space-x-3'>
                                <label className={`${customStyles.label}`}>Nama</label>
                                <Field 
                                    type='text' 
                                    name='username'
                                    className={`${customStyles.input}`}
                                    placeholder='Masukkan nama lengkap Anda' 
                                />
                            </div>
                            <div className='flex items-center space-x-3'>
                                <label className={`${customStyles.label}`}>Email</label>
                                <Field 
                                    type='email' 
                                    name='email'
                                    className={`${customStyles.input}`}
                                    placeholder='Masukkan email Anda' 
                                />
                            </div>
                            <div className='flex items-center space-x-3'>
                                <label className={`${customStyles.label}`}>Telepon</label>
                                <Field
                                    type='number' 
                                    name='no_telepon' 
                                    className={`${customStyles.input}`}
                                    placeholder='Masukkan nomor telepon Anda' 
                                />
                            </div>
                            <div className='flex items-center space-x-3'>
                                <label className={`${customStyles.label}`}>Jenis Kelamin</label>
                                <Field 
                                    type='text'
                                    name='gender'    
                                    className={`${customStyles.input}`}
                                    placeholder='Masukkan nomor telepon Anda' 
                                    disabled
                                />
                            </div>
                            <div className='flex items-center space-x-8'>
                                <label className={`${customStyles.label}`}>Tanggal lahir</label>
                                <Datepicker
                                  onChange={(date: Date) => {
                                    const formattedDate = moment(date).toISOString()
                                    setFieldValue("birth_date", formattedDate);
                                  }}
                                  initialDate={data?.birth_date ? moment(data.birth_date).toDate() : undefined}
                                  className='py-1 px-3'
                                />
                            </div>
                            <div className='flex items-center space-x-8'>
                                <label className={`${customStyles.label}`}>Provinsi</label>
                                <div className='w-full'>
                                  <Field 
                                    as='select'
                                    name='province'
                                    styles={styleSelect}
                                    className={`${customStyles.input} !px-2 text-sm py-2`}
                                    onChange={(e : any) => {
                                        const selectedOption = e.target.options[e.target.selectedIndex]
                                        const selectedId = selectedOption.id
                                        setFieldValue('province', selectedOption.label)
                                        setProvId(selectedId)
                                    }}
                                   >
                                    {provinceOptions?.map((item, i) => (
                                        <option id={item.value} key={i} value={item.label}>{ item.label }</option>
                                    ))}
                                 </Field>
                                </div>
                            </div>
                            <div className='flex items-center space-x-8'>
                                <label className={`${customStyles.label}`}>Kota</label>
                                <div className='w-full'>
                                 <Field 
                                    as='select'
                                    name='city'
                                    className={`${customStyles.input} !px-2 text-sm py-2`}
                                    onChange={(e : any) => {
                                        const selectedOption = e.target.options[e.target.selectedIndex]
                                        const selectedId = selectedOption.id
                                        setFieldValue('city', selectedOption.label)
                                        setProvCity(selectedId)
                                    }}
                                   >
                                    {cityData?.map((item, i) => (
                                        <option id={item.value} key={i} value={item.label}>{ item.label }</option>
                                    ))}
                                 </Field>
                                </div>
                            </div>
                            <div className='flex items-center space-x-8'>
                                <label className={`${customStyles.label}`}>Kecamatan</label>
                                <div className='w-full'>
                                 <Field 
                                    as='select'
                                    name='district'
                                    className={`${customStyles.input} !px-2 text-sm py-2`}
                                    onChange={(e: any) => {
                                        const selectedOption = e.target.options[e.target.selectedIndex]
                                        setFieldValue('district', selectedOption?.label)
                                    }}
                                   >
                                    {districtData?.map((item, i) => (
                                        <option key={i} value={item.label}>{ item.label }</option>
                                    ))}
                                 </Field>
                                </div>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <label className={`${customStyles.label}`}>Kode Pos</label>
                                 <Field 
                                    name='post_code'    
                                    type='text' 
                                    className={`${customStyles.input}`}
                                    placeholder='Masukkan kode pos' 
                                />
                            </div>
                            </div>

                            <div className="w-1/3 flex flex-col gap-6 items-start justify-start relative">
                                <div {...getRootProps()} className="relative w-[50%] h-[50%] border-2 border-dashed rounded-full cursor-pointer p-2">
                                    <input {...getInputProps()} />
                                    <img
                                        src={profileImage?.preview || url || data?.image as undefined || undefined}
                                        alt="profile-logo"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-center tracking-wide text-sm font-medium">
                                        Klik untuk mengubah <br /> profile
                                    </p>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col'>
                                    <label className='text-sm opacity-60'>Bergabung</label>
                                    <span className='text-sm font-semibold'>{moment(data?.registration_date).format('LL')}</span>
                                </div>
                           </div>
                        </div>

                        <Button
                            size="sm"
                            type="submit"
                            variant="outline"
                            className="flex-1 border-2 border-green-500 text-green-600 font-semibold hover:bg-green-500 hover:text-white transition duration-300 mt-10 tracking-wide"
                            text="Simpan Perubahan"
                        />
                    </div>
                </Form>
              )
            }}
        </Formik>
    )
}