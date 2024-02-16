export type Person = {
    id: string
    name: string
    age: number
    address?: Address
}

export type Address = {
    id: string
    zip: number
    city: string
    street: string
    number: string
    residents?: Person[]
}

export type aIdPId = {
    personId: string
    adressId: string
}