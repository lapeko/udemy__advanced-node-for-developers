import crypto from 'crypto';

process.env.UV_THREADPOOL_SIZE = '8';

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('2:', Date.now() - start);
});


crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('5:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('6:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('7:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('8:', Date.now() - start);
});