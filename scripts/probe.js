/* eslint-disable */
const request = require('got');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// Define readiness function
async function checkReadiness() {
  const body = await request.get(`${process.env.GITLAB_URL}/-/readiness?all=1`).json();

  return body.master_check[0].status == 'ok';
}

// Poll GL for a successful readiness status
async function run() {
  let attempt = 0;

  await sleep(120000);

  while (attempt < 25) {
    try {
      const ready = await checkReadiness();

      if (ready) break;
    } catch (e) {
      console.error(e.message);
    }

    await sleep(10000);

    attempt += 1;
  }
}

run();
