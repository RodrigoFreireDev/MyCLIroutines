import { createInterface } from "readline";

const interfaceInOut = createInterface({
  input: process.stdin,
  output: process.stdout
});

export default interfaceInOut;
