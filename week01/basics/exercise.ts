// 1.

const myName: string = "Christian";
const myAge: number = 23;
const IamMale: boolean = true;
const favoriteFootballers: string[] = [
  "Cristiano",
  "Marcelo",
  "Sergio",
  "Luka",
];
const randomThings: any = "a";

// 2

enum Weeks {
  MONDAY = 0,
  TUESTDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = "Friday",
  SATURDAY = 6,
  SUNDAY = 7,
}

// key pair values(object)

// 3

class Person {
  private name: string = "Peter";
  private readonly email: string = "cs@gmail.com";
  private age: number = 23;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getAge(): number {
    return this.age;
  }

  setName(name: string): void {
    this.name = name;
  }
  /*
email is readonly
    setEmail(email: string): void{
        this.email = email
    }
*/
  setAge(age: number): void {
    this.age = age;
  }
}

const person: Person = new Person("Christian", "cs@gmail.com", 23);

class Employee extends Person {
  private salary: number;

  constructor(name: string, email: string, age: number, salary: number) {
    super(name, email, age);
    this.salary = salary;
  }
}

const employee1: Employee = new Employee(
  "Christian",
  "cs@gmail.com",
  23,
  45000
);

// 4

let variable: any = "500";

let variable2: string = variable as string;

// 5

function sum(a: number, b: number): number {
  return a + b;
}

// 6

let http: [number, string] = [200, "ok"];
let http2: [number, string] = [400, "Not found"];
let http3: [number, string] = [404, "error"];
let http4: [number, string] = [500, "server error"];

let tuple: [string, string, number | string] = [
  person.getName(),
  person.getEmail(),
  person.getAge(),
];

// 7

function takeTwoTypes(a: string | number): void {}

takeTwoTypes("Hello");
takeTwoTypes(1);

// 8

function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

function combineObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

// 9

const ticTacToeBoard: Array<Array<string>> = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

// 10

// Part 1
// A variable that might be null or undefined
let nullableValue: string | null | undefined = "Hello";

// Use the exclamation mark to assert that the value is non-null
let nonNullableValue: string = nullableValue!;

console.log(nonNullableValue); // Output: Hello

// Part 2
// A variable that might be null or undefined
let myString: string | undefined = possibleUndefinedStringFunction();
// Use the exclamation mark to assert that the value is non-null
let lemgth: number = myString!.length;

// 11

// Part 1
// A function that takes an optional parameter
function printName(name?: string) {
  console.log(name);
}

// Call the function without a parameter
printName(); // Output: undefined
// Call the function with a parameter
printName("John"); // Output: John

// Part 2
// A type alias with an optional age property
type Person1 = {
  name: string;
  age?: number;
};

// Create a person object with an age property

const personWithAge: Person1 = {
  name: "Luka",
  age: 37,
};
// Create a person object without an age property
const personWithoutAge: Person1 = {
  name: "Kiko",
};

// 12

function stringOrNumber(a: string | number): string | number {
  if (typeof a === "string") {
    return a;
  } else if (typeof a === "number") {
    return a * 2;
  } else {
    throw new Error("Type not supported");
  }
}

// 13

let input: any = "My name is";
let inputValue: string = input as string;

let myDiv = document.getElementById("myDiv");
let myInputElement: HTMLInputElement = myDiv as HTMLInputElement;

myInputElement.value = "Type assertion Example";

// 14

function literalTypes(direction: string): number {
  switch (direction) {
    case "left":
      return 1;
    case "right":
      return 2;
    case "up":
      return 3;
    case "down":
      return 4;
    default:
      return 0;
  }
}

// 15

type Human = {
    name: string
    eat: () => void
}

type Alien = {
    species: string
    fly: () => void
}


function isHuman(creator: Human | Alien): creator is Human {
    return "name" in creator
}

function performAction(creator: Human | Alien): void {
    if(isHuman(creator)){
        console.log(`${creator.name} is eating`)
        creator.eat
    }else{
        console.log(`An alien of species ${creator.species}is flying`)
        creator.fly
    }
}

// 16

    type Personas = {
        name: string
    }

    type Car = {
        model: string
    }

    function isPersonas(obj: any): obj is Personas {
        return obj instanceof Object && "name" in obj
    }

    function getProperty(obj: Personas | Car): string{
        if(isPersonas(obj)){
            return obj.name
        }else{
            return obj.model
        }
    }

    // 17

    interface Bird {
        fly(): void;
        layEggs(): void;
      }
      
      interface Fish {
        swim(): void;
        layEggs(): void;
      }
      
      // write a type predicate to narrow the type of the fish parameter
      function isFish(pet: Fish | Bird): pet is Fish {
        return "swim" in pet
      }
      
      function howToMove(pet: Fish | Bird) {
        if (isFish(pet)) {
          pet.swim();
        } else {
          pet.fly();
        }
      }

      // 18

      interface Menneske {
        navn: string
        [key: string]: any
      }


      const menneske: Menneske = {
        navn: "Christian",
        telefon: 60752886,
      }


      interface Folk{
        mitnavn: string
      }

      interface Elev{
        studentId: number
      }

      type FolkOgElev = Folk & Elev

      function twoInterfaces(folk: Folk, elev: Elev): FolkOgElev{
        return {...folk, ...elev }
      }