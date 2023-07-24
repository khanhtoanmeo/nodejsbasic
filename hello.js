const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const promise1 = async () => {
  await delay(1000);
  console.log("Promise 1 executed");
};

const promise2 = async () => {
  await delay(3000);
  console.log("Promise 2 executed");
};

// Consider this to be a controller
(async () => {
  try {
    const start = new Date();
    await promise1();
    await promise2();
    const end = new Date() - start;
    console.info("Execution time: %dms", end); // This will take 4s
  } catch (e) {
    console.log("Got an error here");
  }
})();
