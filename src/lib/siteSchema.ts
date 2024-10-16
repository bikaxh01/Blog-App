import {z} from 'zod'


export const siteSchema = z.object({
    name: z.string().min(3).max(30),
    subDirectory:z.string().min(3),
    description:z.string().optional()
  })