import { prisma_client } from "@/utils/DB";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
const Webhook_Secret = process.env.CLERK_WEBHOOK_SECRET as string;

//Webhook
export async function POST(req: Request) {
  try {
    console.log("🚀 ~ POST ~ POST:User created");
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const headers = req.headers;

    const svix_id = headers.get("svix-id");
    const svix_timestamp = headers.get("svix-timestamp");
    const svix_signature = headers.get("svix-signature");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return Response.json(
        { message: "Invalid webhook Request" },
        {
          status: 400,
        }
      );
    }

    //Verify request
    const wh = new Webhook(Webhook_Secret);
    wh.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    });

    const { data } = payload;
    const { external_accounts, first_name, last_name, image_url,id } = data;

    const email = external_accounts[0].email_address;

    await prisma_client.user.create({
      data: {
        id:id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        avatarURl: image_url,
      },
    });

    return Response.json("OK");
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      {
        success: false,
        message: "Error while Creating user",
      },
      {
        status: 500,
      }
    );
  }
}
