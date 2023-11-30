export const REGEX_TESTS = {
    user: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
    email: /^[a-zA-Z\d][\w\.-]*[a-zA-Z\d]@[a-zA-Z\d][a-zA-Z\d\.-]*[a-zA-Z\d]\.[a-zA-Z]{2,}$/,
    pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]*).{8,24}$/,
};


