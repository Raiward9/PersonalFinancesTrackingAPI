import z from 'zod'

const incomeSchema = z.object({
   amount: z.number().positive(),
   type: z.enum(
    ['Salary', 'Business revenue', 'Extra hours', 'Others']
   ),
   date: z.coerce.number().int().positive()
})

export function validateIncome(object) {
    return incomeSchema.safeParse(object)
} 

export function validatePartialIncome(object) {
    return incomeSchema.partial().safeParse(object)
}
