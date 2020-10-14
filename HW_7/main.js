const name = 'Сергей';
const age = 20;
const role = 'User';
const occupation = 'Design';

console.log(
    "1. !!name && (age > 18)  ======================== ",
    !!name && (age > 18)
);

console.log(
    "2. (role == 'Admin') || (occupation == 'CEO')  == ",
    (role == 'Admin') || (occupation == 'CEO')
);

console.log(
    "3. occupation || role  ========================== ",
    occupation || role
);

console.log(
    "4. !!name && (age > 18) || role == 'Admin'  ===== ",
    !!name && (age > 18) || role == 'Admin'
);

console.log(
    "* (!!name && role !== 'Admin') && age  ========== ",
    (!!name && role !== 'Admin') && age
);