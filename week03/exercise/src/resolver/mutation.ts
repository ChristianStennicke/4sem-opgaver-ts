import { Context } from 'vm'
import { Address, Person} from './types.js'

export const Mutation = {
    createPerson: (_parent: never, args: Person, { persons, addresses }: Context) => {
        const newPerson: Person = {
            id: String(persons.length + 1),
            name: args.name,
            age: args.age,
            address: undefined
        };
        persons.push(newPerson);
        return newPerson;
    },
    createAddress: (_parent: never, args: Address, { persons , addresses }: Context) => {
        const newAddress: Address = {
            id: String(addresses.length + 1),
            zip: args.zip,
            city: args.city,
            street: args.street,
            number: args.number,
            residents: []
        }
        addresses.push(newAddress);
        return newAddress;
    },
    deleteAddress: (_parent: never, { addressId }: {addressId: string}, { addresses }: Context) => {
        const addressIndex: number = addresses.findIndex((address: Address) => address.id === addressId);
        
        if (addressIndex === -1) {
            throw new Error("Address not found");
        }
        
        const deletedAddress = addresses.splice(addressIndex, 1)[0];
        
        return deletedAddress;
    },
    deletePerson: (_parent: never, {personId}: {personId: string}, { persons }: Context) => {
        const personIndex: number = persons.findIndex((person: Person) => person.id === personId);
        
        if (personIndex === -1) {
            throw new Error("Person not found");
        }
        
        const deletedPerson = persons.splice(personIndex, 1)[0];
        
        return deletedPerson;
    },
    addPersonToAddress: (_parent: never, {personId, addressId}: {personId: string, addressId: string}, { persons , addresses }: Context) => {
        const person: Person = persons.find((person: Person) => person.id === personId);
        const address: Address = addresses.find((address: Address) => address.id === addressId);  
        
        if (!person || !address) {
            throw new Error('Person or Address not found!');
        }
        
        if (!address.residents) {
            address.residents = [];
        }
        
        if (address.residents.includes(person)) {
            throw new Error('Person already has this address');
        }
        
        address.residents.push(person);
        person.address = address;
    
        return address;
    },
    removePersonFromAddress: (_parent: never, {personId, addressId}: {personId: string, addressId: string}, { persons , addresses }: Context) => {
        const person: Person = persons.find((person: Person) => person.id === personId);
        const address: Address = addresses.find((address: Address) => address.id === addressId);  
    
        if (!person || !address) {
            throw new Error('Person or Address not found');
        }
    
        if (!address.residents) {
            address.residents = [];
        }
        
        const indexNumber = address.residents.findIndex((resident: Person) => resident.id === person.id);
        if(indexNumber === -1) {
            throw new Error('Person not at address');
        }
        
        person.address = undefined;
        address.residents.splice(indexNumber, 1);
        
        return address;
    },
};
