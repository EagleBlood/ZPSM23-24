const collections = [
    {},
    15,
    "hello@test.pl",
    null,
    ['aaa', 'bbb', 5],
    'admin@gmail.com',
    undefined,
    'a34@yahoo.com',
    '321@a',
    '321.pl'
];

console.log(collections);

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const getEmails = collections
    .filter(item => typeof item === 'string')
    .map(string => string.match(emailRegex))
    .filter(email => email !== null);

console.log(getEmails);