// Thead Main
function app() {
  let state = null
  // Thead IO
  get().then((data) => {
    state = data;
  });

  console.log("Header " + state);
  console.log("Content");
  console.log("Footer");
}

async function get() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data");
    }, 5000);
  });
}

app();
