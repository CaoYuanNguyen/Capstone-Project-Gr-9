// data/testData.ts
export const BASE_URL = 'https://demo5.cybersoft.edu.vn'
export const AVATAR_PATH = 'C:\\Users\\NGUYEN\\OneDrive\\Pictures\\Miu\\15e58ae66b57e409bd46.jpg'

export const VALID_USER = {
    email: 'tnguyen22@gmail.com',
    password: '123',
    name: 'Nguyên',
    phone: '0123453525',
    birthday: '28/07/2004',
    gender: 'Nữ',
}

export const LOGIN_DATA = {
    valid: { email: 'tnguyen22@gmail.com', password: '123' },
}

export const REGISTER_DATA = {
    valid: {
        name: 'Nguyen ne',
        email: `tnguyen${Date.now()}@gmail.com`,
        password: '12345678',
        phone: '0125672368',
    },
    duplicateEmail: {
        name: 'Nguyen ne',
        email: 'thaonguyen2223@gmail.com',
        password: '12345678',
        phone: '0125672368',
    },
    weakPassword: {
        name: 'Nguyen ne',
        email: `tnguyen${Date.now()}@gmail.com`,
        password: '1',
        phone: '0125672368',
    },
}

export const CHINH_SUA_DATA = {
    valid: {
        email: 'tnguyen22@gmail.com',
        hoTen: 'Nguyên',
        phone: '0123453525',
        birthday: '28/07/2004',
        gender: 'Nữ',
    },
    invalidEmail: 'emailsaiformat',
    emptyName: '',
    invalidPhone: 'abcdefghij',
}

export const DAT_PHONG_DATA = {
    diaDiem: 'nha-trang',
}

export const LICH_SU_DATA = {
    diaDiem: 'Hồ Chí Minh',
    soKhach: 1,
}

export const UPLOAD_DATA = {
    avatarPath: AVATAR_PATH,
}