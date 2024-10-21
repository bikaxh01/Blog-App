"use client";
import SiteCardComponent from "@/components/siteCard";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

function SitePage() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["sites"],
    queryFn: async () => {
      const response = await axios.get(`/api/get-sites`);
      
      return response.data.data;
    },
    staleTime:60000
  });

  return (
    <>
      <div className=" flex justify-end w-full ">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>Create Site</Link>
        </Button>
      </div>
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : data.length <= 0 ? (
          <div className="  border border-dashed rounded-md w-[80%] h-[50vh] ml-20 flex mt-8 justify-center items-center">
            <div>
              <CirclePlus className=" size-[100px]" />
              <div className=" mt-10">
                <h3>No site Found</h3>
                <Button asChild className=" mt-4">
                  <Link href={"/dashboard/sites/new"}>Create Site</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className=" text-2xl font-semibold text-primary">Manage Sites</h2>
          <div className=" flex flex-wrap gap-4 sm:grid-cols-2 mt-3">
            {data.map((site: any) => (
             <SiteCardComponent site={site} key={site.id} />
            ))}
          </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SitePage;
