const {createClient} = require('redis');

let redisClient;

createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect()
  .then(client => redisClient = client);

const cache = async (req, res, next) => {
  if (!redisClient) return next();

  const {baseUrl, path, method, query} = req;

  const key = `${baseUrl}${path}${JSON.stringify(query)}`;

  if (method !== "GET") {
    redisClient.del(key);
    return next();
  }

  const cached = JSON.parse(await redisClient.get(key));

  if (cached) {
    res.type(cached.contentType);
    return res.send(cached.body);
  }

  const originResSend = res.send;
  const originResJson = res.json;

  res.send = async (body) => {
    await originResSend.call(res, body);
    await redisClient.set(key, JSON.stringify({body, contentType: res.get("Content-Type")}), 'EX', 3600);
  };

  res.json = async (body) => {
    await originResJson.call(res, body);
    await redisClient.set(key, JSON.stringify({body, contentType: res.get("Content-Type")}), 'EX', 3600);
  };

  next();
};

module.exports = cache;
