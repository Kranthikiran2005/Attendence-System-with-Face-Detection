async function test() {
     
    console.log("Start");

    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("Hello after 2 seconds");

    console.log("End");
}

test();
console.log("Outside");