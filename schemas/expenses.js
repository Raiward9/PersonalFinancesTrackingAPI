import z from 'zod'

const expenseSchema = z.object({
   cost: z.number().positive(),
   type: z.enum(
    ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others']
   ),
   date: z.coerce.number().int().positive()
})

export function validateExpense(object) {
    return expenseSchema.safeParse(object)
} 

export function validatePartialExpense(object) {
    return expenseSchema.partial().safeParse(object)
}
