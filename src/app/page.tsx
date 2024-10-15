"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const {isLoaded,isSignedIn,user} =  useUser()
   const router = useRouter()
  if (isSignedIn) {
    router.push('/dashboard')
  }
  
  return (
    <div>
      <Link href={'/sign-in'}>
        <Button>Sign-in</Button>
      </Link>
    </div>
  );
}
