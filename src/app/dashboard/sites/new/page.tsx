"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { siteSchema } from "@/lib/siteSchema";
import { useDebounceCallback } from "usehooks-ts";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function NewSitePage() {
  const [subDirectoryName, setSubDirectoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let { mutate, isPending } = useMutation({
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

  const debounce = useDebounceCallback(setSubDirectoryName, 400);
  const queryClient = useQueryClient()
  // handle sub-directory

  useEffect(() => {
    const verifySubDirectory = async () => {
      if (subDirectoryName) {
        try {
          const response = await axios.get(
            `/api/verify-subdirectory?name=${subDirectoryName}`
          );
          setErrorMessage("");
        } catch (error) {
          const Error = error as AxiosError;
          //@ts-ignore
          const message = Error.response?.data.message;
          setErrorMessage(message);
          isPending = true;
        }
      }
    };
    verifySubDirectory();
  }, [subDirectoryName]);

  const route = useRouter();
  const onSubmit = async (data: z.infer<typeof siteSchema>) => {
    try {
      mutate(data, {
        onSuccess: (data) => {
          toast.success(data.message);
          //@ts-ignore
            queryClient.invalidateQueries("sites")
          route.push("/dashboard/sites");
        },
        onError: (error) => {
          toast.error("Something Went wrong");
        },
      });
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
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
                          <Input
                            placeholder="Sub Directory"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debounce(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          <span className=" text-red-700">{errorMessage}</span>
                        </FormDescription>
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
                    disabled={isPending || errorMessage ? true:false}
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
