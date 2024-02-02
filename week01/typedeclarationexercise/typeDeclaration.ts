import axios, { AxiosError, AxiosResponse } from "axios";

type User = {
    name: string;
    username: string;
    email: string;
}

function logUserInfo(user: User): void{
    console.log(
        `Name: ${user.name}
        Username: ${user.username}
        Email: ${user.email}`
    )
}

axios.get("https://jsonplaceholder.typicode.com/users/1")
.then((res: AxiosResponse<User>) => {
    return res.data
}).catch((err: AxiosError) => {
    throw err
})

axios.get("https://jsonplaceholder.typicode.com/users")
.then((res: AxiosResponse<User[]>) => {
    res.data})
.catch((err: AxiosError) => {
    throw err
})

/* 
Question 1:
    
Type declarationen filen ligger for Axios ligger i node_modules folderen

Question 2:

.d.ts

Question 3:

    - npm i @types/<name>
Question 4:

De har samme funktion at deklarere eller definere for TypeScript i .d.ts filer. 
Forskellen er at den ene deklarere og den anden definere.

*/
    