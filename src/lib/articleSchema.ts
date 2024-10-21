import { z } from "zod";

export const ArticleSchemaClient = z.object({
  title: z.string().min(3).max(30),
  description: z.string().optional(),
});
export const ArticleSchemaServer = z.object({
  title: z.string().min(3).max(30),
  description: z.string().optional(),
  imageUrl: z.string().min(2),
  siteId:z.string().min(4),
  ArticleContent:z.string().min(3)
});
