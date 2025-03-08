import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-32 h-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Contexbluid-removebg-preview-AcSYuWkQdujSkSVhRRxewUpLWTxIjS.png"
          alt="CONTEXTBUILD Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}

