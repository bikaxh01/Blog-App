import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface siteInterface {
  id: string;
  name: string;
  subDirectory: string;
  description: string;
  userId: string;
  createdAt: string;
}

function SiteCardComponent({ site }: { site: siteInterface }) {
  return (
    <Card className=" h-[20vh] w-[40vh]">
      <CardHeader>
        <CardTitle>{site.name}</CardTitle>
        <CardDescription>{site.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={"#"}>View Articles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SiteCardComponent;
