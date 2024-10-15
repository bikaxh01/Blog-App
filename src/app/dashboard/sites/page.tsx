"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function SitePage() {
  const [sites, setSites] = useState([]);
  return (
    <>
      <div className=" flex justify-end w-full ">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>Create Site</Link>
        </Button>
      </div>
      <div>
        {sites.length <= 0 ? (
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
            <h1>Data</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default SitePage;
