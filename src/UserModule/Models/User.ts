import { Address } from "./Address";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: Address;
    avatar: string;
    company: string|undefined;

}
