import { prisma_client } from "@/utils/DB";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return Response.json(
        {
          message: "Unauthorized",
        },
        {
          status: 400,
        }
      );
    }

    const sites = await prisma_client.site.findMany({
      where: {
        userId: userId,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Successfully Fetched",
        data: sites,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Internal server Error while Fetching Sites",
      },
      {
        status: 500,
      }
    );
  }
}
