"use client"

import { useRouter } from "next/navigation"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

interface RegisterOrganizationButtonProps extends ButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function RegisterOrganizationButton({
  variant = "default",
  size = "default",
  className,
  ...props
}: RegisterOrganizationButtonProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/organizations/register")
    } else {
      router.push("/auth/login?redirect=/organizations/register")
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick} {...props}>
      Register Organization
    </Button>
  )
}

