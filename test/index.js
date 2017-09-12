const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter
  .on("newListener", (event) => {
    console.dir(`new ${event}`);
  })
  .on("removeListener", () => {
    console.dir("remove");
  })
  .on("asdf", () => {
    console.log(123);
  })
  .once("asdfa", () => {
    console.log(1233);
  })
myEmitter.emit("asdfa");
myEmitter.prependListener("asdf", () => {
  console.log(12333);
});
console.log(myEmitter.eventNames());
myEmitter.emit("asdf");