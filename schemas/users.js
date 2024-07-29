import z from 'zod'

const userSchema = z.object({
    username: z.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username is required'
    }).min(2, 'At least 2 characters required'),

    password: z.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password is required'
    }).min(4, 'At least 4 characters required'),

})

export function validateUser(object) {
    return userSchema.safeParse(object)
} 
