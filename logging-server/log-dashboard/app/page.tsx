import Image from 'next/image'
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h1 className="text-6xl font-bold text-center">
          Distributed Log Manager
      </h1>
        <Link href='logs' className={buttonVariants({ variant: "outline" })}>Logs Detail</Link>
    </main>
  )
}
