"use server";
import { ArticleSchemaServer } from "@/lib/articleSchema";
import { prisma_client } from "@/utils/DB";
import { GetUserId } from "@/utils/requireUser";
import { redirect } from "next/navigation";

import { z } from "zod";
export const createPost = async (
  formData: z.infer<typeof ArticleSchemaServer>
) => {
  const userId = GetUserId();
  console.log("🚀 ~ createPost ~ userId:", formData);

  const validate = ArticleSchemaServer.safeParse(formData);

  if (!validate.success) {
    return validate.error;
  }

  const { title, description, imageUrl, ArticleContent, siteId } =
    validate.data;

  const post = await prisma_client.post.create({
    data: {
      title: title,
      description: description,
      imageUrl: imageUrl,
      content: JSON.parse(ArticleContent),
      siteId: siteId,
      userId: userId,
    },
  });

  return redirect(`/dashboard/sites/${siteId}`);
};

export const updatePost = async (
  formData: z.infer<typeof ArticleSchemaServer>,
  articleId: string
) => {
  const userId = GetUserId();

  const validate = ArticleSchemaServer.safeParse(formData);

  if (!validate.success) {
    return validate.error;
  }

  const { title, description, imageUrl, ArticleContent, siteId } =
    validate.data;

  const post = await prisma_client.post.update({
    where: {
      id: articleId,
    },
    data: {
      title: title,
      description: description,
      imageUrl: imageUrl,
      content: JSON.parse(ArticleContent),
    },
  });

  return redirect(`/dashboard/sites/${siteId}/${articleId}`);
};
