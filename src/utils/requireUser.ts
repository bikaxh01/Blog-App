import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export  function GetUserId() {
    const { userId } = auth();

    if (!userId) {
      return redirect("/sign-in");
    }

    return userId
}