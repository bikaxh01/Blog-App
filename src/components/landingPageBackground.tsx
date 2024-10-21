import React from "react";
import { BackgroundLines } from "@/components/ui/background-line";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function BackgroundLinesComponent() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Publish Your First Blog, <br /> With Us,
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nulla
        quae est optio,
      </p>
      <div className=" z-30 mt-9">
        <Link href={"/sign-in"}>
          <Button>Sign-in</Button>
        </Link>
      </div>
    </BackgroundLines>
  );
}
