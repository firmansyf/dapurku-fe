/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from '@/components/commons'
import { Formik, Form, Field } from 'formik'
import { FC, useState } from 'react'
import { AddEditProductProps } from '@/types/admin/productManagement'
import { useDropzone, Accept } from "react-dropzone"

interface UploadedImage {
    preview: string;
    file: File;
}
  
const AddEditForm: FC<AddEditProductProps> = ({ openModal, setOpenModal }) => {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          setUploadedImage({
            preview: URL.createObjectURL(file),
            file,
          })
        }
      }
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] } as Accept,
        multiple: false
    })
    
    const handleOnSubmit = () => { }
    
    const onClose = () => {
        setOpenModal(false)
        setUploadedImage(null)
    }

    return (
        <Modal
            isOpen={openModal}
            onClose={onClose}
            title='Tambah Produk'
        >
            <Formik
                initialValues={{
                    
                }}
                onSubmit={handleOnSubmit}
                enableReinitialize
            >
              {() => {
                return (
                    <Form className='space-y-5'>
                        <div className='flex flex-col gap-2'>
                           <div className="flex flex-col gap-1">
                                <label>Upload Gambar</label>
                                <div
                                {...getRootProps()}
                                className={`w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
                                    isDragActive
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                }`}
                                >
                                <input {...getInputProps()} />
                                <p className="text-gray-600">
                                    {isDragActive
                                    ? 'Lepaskan file Anda di sini...'
                                    : 'Seret & lepaskan gambar di sini, atau klik untuk memilih'}
                                </p>
                                </div>
                                {uploadedImage && (
                                <div className="mt-4 flex flex-col items-center">
                                    <img
                                       src={uploadedImage.preview}
                                       alt="Preview"
                                       className="w-32 h-32 object-cover rounded-lg shadow-md"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setUploadedImage(null)}
                                      className="mt-2 text-sm text-red-500 hover:underline"
                                    >
                                        Hapus Gambar
                                    </button>
                                </div>
                                )}
                            </div>
                            
                            <div className='flex flex-col gap-1'>
                                <label>Nama Produk</label>
                                <Field
                                    type='text'
                                    name='name'
                                    placeholder='Masukan Nama Produk'
                                    className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                />
                            </div>
                            
                            <div className='flex flex-col gap-1'>
                                <label>Deskripsi Produk</label>
                                <Field
                                    as='textarea'
                                    type='text'
                                    name='description'
                                    placeholder='Masukan Deskripsi Produk'
                                    className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-32'
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label>Harga Produk</label>
                                <Field
                                    type='number'
                                    name='price'
                                    placeholder='Masukan Harga Produk'
                                    className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                />
                            </div>
                        </div>

                        <div className='space-x-2'>
                            <Button type='submit' text='Submit' size='sm' variant='primary' />
                            <Button type='button' text='Cancel' size='sm' variant='secondary' />
                        </div>
                   </Form> 
                )
              }} 
            </Formik>
        </Modal>
    )
}   

export default AddEditForm