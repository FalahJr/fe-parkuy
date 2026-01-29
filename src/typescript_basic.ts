const angka: number = 1; //membuat variable tipe number
const nama: string = "Khoiru M Falah"; //membuat variable tipe string
const isMahasiswa: boolean = true; //membuat variable tipe boolean
const hobbies: string[] = ["Ngoding", "Ngegame", "Basket"] //membuat variable tipe array
const angkaGanjil: Array<number> = [1,3,5,7,9] //membuat variable tipe array cara kedua
const angkaGanjilGenap: Array<number | string> = [1,3,5,7,9,"sepuluh"];

const profile1: { name: string, age: number, jobs?: string } = {
    name    : "Falah",
    age     : 21
};

interface Profile2 { 
    name: string, 
    age: number, 
    jobs?: string,
    hobbies: Array<string>;
    sayHello?: () => void;
    sayHai?():void
};

const profile2: Profile2 = {
    name : "Falah",
    age : 21,
    hobbies: ['Basket', 'Main Game'],
    sayHello: () => {
        console.log("assalamualaikum ");
    },
    sayHai: () => {

    }
};

type Profile3 = { 
    name: string, 
    age: number, 
    jobs?: string 
};

const profile3: Profile3 = {
    name : "Falah",
    age : 22
};

//Bagaimana jika tipe kembalian fungsi tambah adalah string tetapi penjumlahan angka1 dan angka2 tetap number
const tambah = (angka1: number, angka2: number) => {
    return angka1 + angka2;
};

const jumlah = (angka1: number, angka2: number): string => {
    const res = angka1 + angka2;
    return res.toString();
};

interface ButtonAttr{
    color: string
}

interface ButtonFunc <T = {}>{
    (attr: T): string
}

const btn: ButtonFunc<ButtonAttr> = (attr) => "Falah" 
const btn2: ButtonFunc = (attr) => "Falah" 


const sembarangan: any = "Falah"; //satu fungsi yg akan di reject jika di pull request

//Bagaimana penulisan tipe untuk ARRAY OF OBJECT, gunakan tipe profile 1
const dataProfile2: Profile2[] = [
    {
        name: "Falah",
        age: 21,
        hobbies: [""]
    },
    {
        name: "Sahira",
        age: 21,
        hobbies: [""]
    },
] 

//Bagaimana penulisan tipe untuk object yang berisi fungsi 
// Silahkan cek tipe profile2

//Bagaimana penulisan tipe untuk fungsi yang kembaliannya itu promise ATAU void
// Nanti akan dipelajari ketika belajar promise

export default sembarangan