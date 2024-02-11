import { Address } from "./Address";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: Address;
    avatar: string;
    gender: string;
    nextofkin: string|undefined;
    company: string|undefined;

}
