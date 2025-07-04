"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
  photo?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showOnlineStatus?: boolean
  isOnline?: boolean
}

export function UserAvatar({
  name,
  photo,
  size = "md",
  className = "",
  showOnlineStatus = false,
  isOnline = false,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  const statusSizeClasses = {
    sm: "w-2 h-2 -bottom-0 -right-0",
    md: "w-3 h-3 -bottom-0.5 -right-0.5",
    lg: "w-4 h-4 -bottom-0.5 -right-0.5",
    xl: "w-5 h-5 -bottom-1 -right-1",
  }

  // Gera uma foto genérica baseada no nome do usuário
  const getGenericPhoto = (name: string) => {
    // Usa o hash do nome para escolher uma foto consistente
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    // Seleciona um ID de foto baseado no hash (1-100)
    const photoId = (Math.abs(hash) % 100) + 1

    // Determina o gênero baseado no primeiro nome
    const firstName = name.split(" ")[0].toLowerCase()
    const femaleNames = [
      "maria",
      "ana",
      "lucia",
      "fernanda",
      "carla",
      "patricia",
      "sandra",
      "monica",
      "juliana",
      "amanda",
    ]
    const isFemale = femaleNames.some((femaleName) => firstName.includes(femaleName))

    // Retorna URL do placeholder com gênero apropriado
    const gender = isFemale ? "women" : "men"
    return `https://randomuser.me/api/portraits/${gender}/${photoId % 100}.jpg`
  }

  // Gera uma cor de fallback baseada no nome do usuário
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
      "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
      "bg-gradient-to-br from-purple-400 to-purple-600 text-white",
      "bg-gradient-to-br from-pink-400 to-pink-600 text-white",
      "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white",
      "bg-gradient-to-br from-teal-400 to-teal-600 text-white",
      "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
      "bg-gradient-to-br from-red-400 to-red-600 text-white",
      "bg-gradient-to-br from-cyan-400 to-cyan-600 text-white",
      "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
    ]

    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const avatarColor = getAvatarColor(name)
  const initials = getInitials(name)
  const genericPhoto = photo || getGenericPhoto(name)

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} ring-2 ring-gray-100 dark:ring-gray-700 ${className}`}>
        <AvatarImage
          src={genericPhoto || "/placeholder.svg"}
          alt={name}
          className="object-cover"
          onError={(e) => {
            // Se a imagem falhar ao carregar, esconde o elemento para mostrar o fallback
            e.currentTarget.style.display = "none"
          }}
        />
        <AvatarFallback className={`${avatarColor} ${textSizeClasses[size]} font-semibold`}>{initials}</AvatarFallback>
      </Avatar>

      {showOnlineStatus && (
        <div
          className={`absolute ${statusSizeClasses[size]} rounded-full border-2 border-white dark:border-gray-800 ${
            isOnline ? "bg-emerald-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  )
}
