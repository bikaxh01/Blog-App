"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ArticleSchemaClient } from "@/lib/articleSchema";
import { UploadDropzone } from "@/utils/uploadthing";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import toast from "react-hot-toast";
import TailwindEditor from "@/components/EditorWrapper";
import { JSONContent } from "novel";
import { createPost, updatePost } from "@/app/action";

interface InitialData {
  id: string;
  title: string;
  content: any;
  description: string | null;
  imageUrl: string;
  siteId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

function EditArticle({ initialData }: { initialData: InitialData }) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(
    initialData.imageUrl
  );
  const [ArticleContent, setArticleContent] = useState<undefined | JSONContent>(
    initialData.content
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ArticleSchemaClient>>({
    resolver: zodResolver(ArticleSchemaClient),
    defaultValues: {
      title: initialData.title,
      description: initialData.description ? initialData.description : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ArticleSchemaClient>) => {
    if (!imageUrl || !ArticleContent) {
      return toast.error("All Fields are Required");
    }
    setIsDisabled(true);
    try {
      const response = await updatePost(
        {
          ...data,
          ArticleContent: JSON.stringify(ArticleContent),
          imageUrl,
          siteId: initialData.siteId,
        },
        initialData.id
      );

      toast.success('Updated Successful')
    } catch (error) {
      toast.error("Something Went wrong");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Card className=" mt-4">
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className=" flex flex-col gap-y-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Title"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Description"
                            {...field}
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Label>Article Content</Label>
                    <TailwindEditor
                      onChange={setArticleContent}
                      initialValue={ArticleContent}
                    />
                  </div>
                  <div className=" grid gap-2">
                    <Label>Cover Image</Label>
                    {imageUrl ? (
                      <div>
                        <Image
                          src={imageUrl}
                          alt="Cover-image"
                          className=" object-cover w-[200px] h-[200px] rounded-lg"
                          width={200}
                          height={200}
                        />
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        className=" mt-2"
                        onClientUploadComplete={(res) => {
                          setImageUrl(res[0].url);
                        }}
                        onUploadError={() => {
                          toast.error("something went wrong...");
                        }}
                      />
                    )}
                  </div>
                  <Button
                    className="bg-primary"
                    type="submit"
                    disabled={isDisabled}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default EditArticle;
