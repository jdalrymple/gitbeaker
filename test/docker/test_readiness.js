const request = require('ky-universal');

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// Define readiness function
async function check_readiness() {
  const r = await request.get(`${process.env.GITLAB_URL}/-/readiness`);
  const body = await r.json();
  
  return ![
    body.db_check.status,
    body.redis_check.status,
    body.cache_check.status,
    body.queues_check.status,
    body.shared_state_check.status,
    body.gitaly_check.status,
  ].some(el => el != 'ok');
}

// Poll GL for a successful readiness status
async function run() {
  let attempt = 0;

  while (attempt < 25) {
    try {
      let ready = await check_readiness();

      if (!ready) break;
    } catch(e) {
    }

    await sleep(10000);

    attempt++;
  }
}

run();
