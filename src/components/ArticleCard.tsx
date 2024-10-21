"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Eclipse, EclipseIcon, EllipsisVertical } from "lucide-react";
interface ArticleInterface {
  imageUrl: string;
  id: string;
  title: string;
  createdAt: string;
  description: string;
  userId: string;
  siteId: string;
}

function ArticleCardComponent({ article }: { article: ArticleInterface }) {
  return (
    <Card key={article.id}>
      <Image
        src={article.imageUrl}
        alt={article.title}
        className="rounded-t-lg object-cover w-full h-[200px]"
        width={400}
        height={200}
      />
      <CardHeader>
        <CardTitle className="truncate">{article.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {article.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className=" pb-6">
        <Button asChild className="w-full">
          <Link href={`/dashboard/sites/${article.siteId}`}>Read Article</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/sites/${article.siteId}/${article.id}/edit`}>
              Edit
              </Link>
              </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export default ArticleCardComponent;
