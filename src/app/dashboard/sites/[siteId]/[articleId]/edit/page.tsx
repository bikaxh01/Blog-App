import EditArticle from "@/components/Form/EditArticleForm";
import { Button } from "@/components/ui/button";
import { prisma_client } from "@/utils/DB";
import { ArrowLeft, icons } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const getArticleData = async (articleId: string) => {
  const article = await prisma_client.post.findUnique({
    where: {
      id: articleId,
    },
  });

  if (!article) {
    return notFound();
  }

  return article;
};

async function EditPage({
  params,
}: {
  params: {
    siteId: string;
    articleId: string;
  };
}) {
  const data = await getArticleData(params.articleId);

  return (
    <div>
      <div className=" flex items-center">
        <Button size="icon" variant={"outline"} asChild className=" mr-3">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className=" size-4" />
          </Link>
        </Button>
        <h1 className=" font-semibold text-2xl">Edit Article</h1>
      </div>
      <EditArticle initialData={data} />
    </div>
  );
}

export default EditPage;
