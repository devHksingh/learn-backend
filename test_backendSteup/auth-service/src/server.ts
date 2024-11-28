import { Config } from "./config";

function welcome(name: string) {
  console.log("Welcome " + name);
  console.log(Config.PORT)
  
}
console.log('testing husky setup ')

welcome("harshit");
