import { Address, Person } from './types.js';
import { Context } from 'vm'

export const Query = {
    hello: () => 'Hello World',
    persons: (parent: never, args: Person, {persons}: Context) => persons,
    person: (
        parent: never,
        args: Person,
        {persons}: Context,
        info: any
    ) => {
        return persons.find((person: Person) => person.name === args.name)
    },
    addresses: (
        parent: never,
        {id}: Address,
        { addresses }: Context,
        info: any
    ) => {
        return addresses.find((address: Address) => address.id === id)
    }
}
