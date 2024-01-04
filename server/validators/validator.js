const z = require("zod");

const signupSchema = z.object({
    name: z
        .string({ required_error: "Name is Required" })
        .trim()
        .min(3, { message: "must contain at least 3 characters" })
        .max(255, { message: "must contain less than 255 characters" }),
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "must contain at least 3 characters" })
        .max(255, { message: "must contain less than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is Required" })
        .trim()
        .regex(/^[6,7,8,9][0-9]{9}$/, { message: "Must contain digits" }),
    password: z
        .string({ required_error: "Password is Required" })
        .trim()
        .min(8, { message: "must contain at least 8 characters" })
        .max(255, { message: "must contain less than 255 characters" })
});

const signinSchema = z.object({
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(3, { message: "must contain at least 3 characters" })
        .max(255, { message: "must contain less than 255 characters" }),
    password: z
        .string({ required_error: "Password is Required" })
        .trim()
        .min(8, { message: "must contain at least 8 characters" })
        .max(255, { message: "must contain less than 255 characters" })
});

module.exports = { signupSchema, signinSchema };