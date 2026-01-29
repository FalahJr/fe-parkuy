export interface Location {
    id_location: string;
    locationName: string;
    cityName: string;
    car: number;
    availableCars: number;
    motorCycle: number;
    availableMotorCycles: number;
    address: string;
    coordinate: string;
    rate: number;
    status: boolean;
    create_at: Date;
    update_at: Date;
}

export interface Petugas {
    id_petugas: string;
    fullName: string;
    cityName: string;
    address: string;
    phone: string;
    date: Date;
    status: string;
    status_bekerja: string;
    create_at: Date;
    update_at: Date;
    location: Location;
}
export interface UserPengendara {
    id: string;
    username?: any;
    email: string;
    role: string;
    emailVerified: boolean;
    create_at: Date;
    update_at: Date;
}

export interface Pengendara {
    id_pengendara: string;
    fullName: string;
    phone: string;
    cityName: string;
    address: string;
    nopol: string;
    jenis_kendaraan: string;
    status: boolean;
    status_parkir: string;
    create_at: Date;
    update_at: Date;
    user: UserPengendara;
}
export interface DetailParkirInReponse {
    id_parking: string;
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    status_bayar: string;
    waktu_masuk: string;
    waktu_keluar?: any;
    create_at: Date;
    update_at: Date;
    petugas: Petugas;
    pengendara: Pengendara;
}

export interface ParkirInResponse {
    id_parking: string;
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    status_bayar: string;
    waktu_masuk: string;
    waktu_keluar?: any;
    create_at: Date;
    update_at: Date;
    petugas: Petugas;
}

export interface DetailParkirOutResponse {
    id_parking: string;
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    status_bayar: string;
    waktu_masuk: string;
    waktu_keluar: string;
    create_at: Date;
    update_at: Date;
    petugas: Petugas;
    pengendara: Pengendara;
}

export interface ParkirOutResponse {
    id_parking: string;
    metode: string;
    nopol: string;
    jenis_kendaraan: string;
    status_bayar: string;
    waktu_masuk: string;
    waktu_keluar: string;
    create_at: Date;
    update_at: Date;
    petugas: Petugas;
}