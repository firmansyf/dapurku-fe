import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
    option: (provided) => ({
        ...provided,
        fontSize: '12px',
    }),
    // menu: (provided) => ({
    //     ...provided,
    //     minHeight: '150px',
    // }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '200px',
    }),
    control: (provided) => ({
        ...provided,
        fontSize: '14px', // Ukuran font input
    }),
};