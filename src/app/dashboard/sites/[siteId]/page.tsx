import ArticleCardComponent from "@/components/ArticleCard";
import SiteCardComponent from "@/components/siteCard";
import { Button } from "@/components/ui/button";

import { prisma_client } from "@/utils/DB";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowLeft,
  CirclePlus,
  PlusCircle,
  Settings,
  View,
  ViewIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const getPosts = async (siteId: string, userId: string) => {
  try {
    const sites = await prisma_client.post.findMany({
      where: {
        userId: userId,
        siteId: siteId,
      },
      select: {
        imageUrl: true,
        id: true,
        title: true,
        createdAt: true,
        description: true,
        userId: true,
        siteId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return sites;
  } catch (error) {}
};

async function SitePage({
  params: { siteId },
}: {
  params: { siteId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }
  const posts = await getPosts(siteId, userId);

  return (
    <>
      <Button asChild size={"icon"} variant={"outline"} className=" mr-2">
        <Link href={`/dashboard/sites`}>
          <ArrowLeft className=" size-4" />
        </Link>
      </Button>
      <div className=" flex w-full justify-end gap-x-4">
        <Button asChild variant={"secondary"}>
          <Link href={"#"}>View Blog</Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href={"#"}>
            <Settings className=" size-4 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/create`}>
            <PlusCircle className=" size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>
      <div>
        {posts === undefined || posts.length <= 0 ? (
          <div className="  border border-dashed rounded-md w-[80%] h-[50vh] ml-20 flex mt-8 justify-center items-center">
            <div>
              <CirclePlus className=" size-[100px]" />
              <div className=" mt-10">
                <h3>No Articles Found</h3>
                <Button asChild className=" mt-4">
                  <Link href={`/dashboard/sites/${siteId}/create`}>
                    Create Article
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className=" text-2xl font-semibold text-primary">Manage Articles</h2>
            <div className=" flex flex-wrap gap-4 sm:grid-cols-2 mt-4">
              {posts.map((article: any) => (
                <ArticleCardComponent article={article} key={article.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SitePage;
