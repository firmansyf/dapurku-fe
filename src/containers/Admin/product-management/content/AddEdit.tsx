/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from '@/components/commons';
import { Formik, Form, Field } from 'formik';
import { FC, useState, useEffect } from 'react';
import { AddEditProductProps } from '@/types/admin/productManagement';
import { useDropzone, Accept } from 'react-dropzone';
import { useAddProductMutation, useEditProductMutation, ProductPayload } from '@/api/admin/product';
import toast from 'react-hot-toast';

interface UploadedImage {
    preview: string;
    file: File;
}

interface ProductFormValues {
    name: string;
    description: string;
    price: string;
}

const AddEditForm: FC<AddEditProductProps> = ({ openModal, setOpenModal, data, reload, setReload }) => {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);

    const postProduct = useAddProductMutation(reload);
    const putProduct = useEditProductMutation(reload);

    useEffect(() => {
        if (data?.image) {
            setExistingImage(data.image);
        }
    }, [data]);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setUploadedImage({
                preview: URL.createObjectURL(file),
                file,
            });
            setExistingImage(null)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] } as Accept,
        multiple: false,
    });

    const handleOnSubmit = async (values: ProductFormValues) => {
        if (!uploadedImage && !existingImage) {
            toast.error('Gambar produk harus diunggah.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price.toString());

            if (uploadedImage) {
                formData.append('image', uploadedImage.file);
            }

            if (data?.id) {
                await putProduct.mutateAsync({ id: data.id, params: formData as ProductPayload })
                    .then(() => {
                        toast.success('Produk berhasil diperbarui!')
                        setUploadedImage(null)
                        setExistingImage(null)
                    })
            } else {
                await postProduct.mutateAsync(formData as ProductPayload)
                    .then(() => {
                        toast.success('Produk berhasil ditambahkan!')
                        setUploadedImage(null)
                        setExistingImage(null)
                    })
            }    
            
            setOpenModal(false);
            setReload?.((prev) => (prev ?? 0) + 1);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
            toast.error(`Error: ${errorMessage}`);
        }
    };

    const onClose = () => {
        setOpenModal(false);
        setUploadedImage(null);
        setExistingImage(null);
    };

    return (
        <Modal isOpen={openModal} onClose={onClose} title="Tambah Produk">
            <Formik
                initialValues={{
                    name: data?.name ?? '',
                    description: data?.description ?? '',
                    price: data?.price?.replace('Rp', '') ?? '',
                }}
                onSubmit={handleOnSubmit}
                enableReinitialize
            >
                {() => (
                    <Form className="space-y-5">
                        <div className="flex flex-col gap-2">
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
                                {(uploadedImage || existingImage) && (
                                    <div className="mt-4 flex flex-col items-center">
                                        <img
                                            src={uploadedImage ? uploadedImage.preview : existingImage!}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                                        />
                                        {uploadedImage ? (
                                            <button
                                                type="button"
                                                onClick={() => setUploadedImage(null)}
                                                className="mt-2 text-sm text-red-500 hover:underline"
                                            >
                                                Hapus Gambar
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setExistingImage(null)}
                                                className="mt-2 text-sm text-red-500 hover:underline"
                                            >
                                                Hapus Gambar
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label>Nama Produk</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Masukan Nama Produk"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label>Deskripsi Produk</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    placeholder="Masukan Deskripsi Produk"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-32"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label>Harga Produk</label>
                                <Field
                                    type="text"
                                    name="price"
                                    placeholder="Masukan Harga Produk"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>

                        <div className="space-x-2">
                            <Button type="submit" text="Submit" size="sm" variant="primary" />
                            <Button
                                type="button"
                                text="Cancel"
                                size="sm"
                                variant="secondary"
                                onClick={onClose}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddEditForm;
