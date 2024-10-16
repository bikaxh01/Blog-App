import { prisma_client } from "@/utils/DB";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

interface sitePayload {
  name: string;
  subDirectory: string;
  description: string;
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json("Unauthorized");
    }

    const { data }: { data: sitePayload } = await req.json();
    console.log("🚀 ~ POST ~ data:", data);

    const site = await prisma_client.site.create({
      data: {
        ...data,
        userId: userId,
      },
    });

    return Response.json({
      success: true,
      message: "Successfully created😁",
      data: site,
    });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      {
        message: "Error while creating site🔴",
      },
      {
        status: 500,
      }
    );
  }
}
