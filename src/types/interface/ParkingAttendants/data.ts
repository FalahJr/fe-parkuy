export interface PetugasDiterimaResponse {
        id_petugas: string;
        fullName: string;
        cityName: string;
        address: string;
        phone: string;
        date: Date;
        status: string;
        status_bekerja: string;
        create_at: Date;
        id_location: string;
        locationName: string;
        id: string;
        email: string;
    }

    export interface LocationDiterima {
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

    export interface UserPetugasDiterima {
        id: string;
        username?: any;
        email: string;
        role: string;
        emailVerified: boolean;
        create_at: Date;
        update_at: Date;
    }

    export interface DetailPetugasDiterimaResponse {
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
        location: LocationDiterima;
        user: UserPetugasDiterima;
    }

    export interface SetLokasiRequest {
        location: string;
    }

    export interface SetLokasiResponse {
        statuCode: number;
        message: string;
    }