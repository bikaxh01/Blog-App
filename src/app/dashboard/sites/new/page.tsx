"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { siteSchema } from "@/lib/siteSchema";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


function NewSitePage() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof siteSchema>) => {
      const response = await axios.post("/api/create-site", {
        data,
      });
      return response.data;
    },
  });
  const form = useForm<z.infer<typeof siteSchema>>({
    resolver: zodResolver(siteSchema),
  });

  const {
    formState: { isLoading },
  } = useForm();
  const route = useRouter()
  const onSubmit = async (data: z.infer<typeof siteSchema>) => {
    try {
      mutate(data, {
        onSuccess: (data) => {
          toast.success(data.message);
            route.push('/dashboard/sites')
        },
        onError: (error) => {
          toast.error("Something Went wrong");
        },
      });
      console.log("🚀 ~ onSubmit ~ data:", data);
    } catch (error) {
    console.log("🚀 ~ onSubmit ~ error:", error)
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center flex-1 ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>Create a new site...</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className=" flex flex-col gap-y-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Site Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subDirectory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Directory</FormLabel>
                        <FormControl>
                          <Input placeholder="Sub Directory" {...field} />
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
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="bg-primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewSitePage;
