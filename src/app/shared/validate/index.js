export const validateEmail = {
  required: "Email is required",
  pattern: {
    value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
    message: "You have entered an invalid email address",
  },
};
