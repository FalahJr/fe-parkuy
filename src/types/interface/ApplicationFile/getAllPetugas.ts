export interface getAllPetugas {
    id_petugas: string;
    fullName: string;
    cityName: string;
    address: string;
    phone: string;
    date?: any;
    status: string;
    status_bekerja: string;
    id: string;
    email: string;
}

export interface getDetailPetugas {
    id_petugas: string;
    fullName: string;
    cityName: string;
    address: string;
    phone: string;
    date?: any;
    status: string;
    status_bekerja: string;
    id: string;
    email: string;
}
export interface petugasRequest {
    search: string;
}
// export interface getAllPetugas {
//     id_petugas: string;
//     fullName: string;
//     cityName: string;
//     address: string;
//     phone: string;
//     date?: any;
//     status: boolean;
//     status_bekerja: boolean;
//     create_at: Date;
//     update_at: Date;
// }

// export interface File {
//     id_petugas: string;
//     fullName: string;
//     cityName: string;
//     address: string;
//     phone: string;
//     date?: any;
//     status: string;
//     status_bekerja: string;
//     id: string;
//     email: string;
// }

// export interface getAllPetugas {
//     message: string;
//     files: File[];
// }

export interface User {
    id: string;
    username?: any;
    email: string;
    role: string;
    emailVerified: boolean;
    create_at: Date;
    update_at: Date;
}

export interface DetailDataPetugas {
    id_petugas: string;
    fullName: string;
    cityName: string;
    address: string;
    phone: string;
    date?: any;
    status: string;
    status_bekerja: string;
    create_at: Date;
    update_at: Date;
    user: User;
}

export interface ConfirmApplicationResponse {
    message: string;
}

export interface dateInterviewRequest {
    date: string;
}