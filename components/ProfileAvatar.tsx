"use client";

import Image from "next/image";

interface Props {
  avatar?: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { container: "w-10 h-10", text: "text-sm", ring: "ring-1" },
  md: { container: "w-12 h-12", text: "text-base", ring: "ring-1" },
  lg: { container: "w-20 h-20", text: "text-2xl", ring: "ring-2" },
};

export function ProfileAvatar({ avatar, firstName, lastName, gender, size = "md", className = "" }: Props) {
  const s = sizes[size];
  const isMale = gender === "Male";

  if (avatar) {
    return (
      <div className={`${s.container} rounded-full overflow-hidden flex-shrink-0 ${s.ring} ${isMale ? 'ring-sky-500/25' : 'ring-rose-500/25'} ${className}`}>
        <Image
          src={avatar}
          alt={`${firstName} ${lastName}`}
          width={size === "lg" ? 80 : size === "md" ? 48 : 40}
          height={size === "lg" ? 80 : size === "md" ? 48 : 40}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback: initials
  return (
    <div
      className={`${s.container} rounded-full flex items-center justify-center font-bold ${s.text} flex-shrink-0 ${s.ring} ${isMale ? 'ring-sky-500/25' : 'ring-rose-500/25'} ${className}`}
      style={{
        background: isMale
          ? "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(56,189,248,0.08))"
          : "linear-gradient(135deg, rgba(244,114,182,0.3), rgba(244,114,182,0.08))",
      }}
    >
      <span className={isMale ? "text-sky-400" : "text-rose-400"}>
        {firstName[0]}{lastName[0]}
      </span>
    </div>
  );
}
