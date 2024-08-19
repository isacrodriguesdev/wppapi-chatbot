// Thead Main
function app() {
  let state = null;
  // Thead IO
  get().then((data) => {
    state = data;
  });
}

async function get() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data");
    }, 5000);
  });
}

app();
