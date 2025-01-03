"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { Github } from "lucide-react"
import Link from "next/link"

export function SignButton() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading) {
    return <div className="h-9" /> // 防止布局跳动
  }

  if (!session?.user) {
    return (
      <Button onClick={() => signIn("github", { callbackUrl: "/moe" })} className="gap-2">
        <Github className="w-4 h-4" />
        使用 GitHub 登录
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link 
        href="/profile"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "用户头像"}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <span className="text-sm">{session.user.name}</span>
      </Link>
      <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline" className="flex-shrink-0">
        登出
      </Button>
    </div>
  )
} 