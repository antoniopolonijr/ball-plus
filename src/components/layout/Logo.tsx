import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      className="flex items-center rounded-sm text-2xl font-bold tracking-tight outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Image
        src="/ballplus.svg"
        alt=""
        width={36}
        height={36}
        priority
        className="pr-1"
      />
      <span className="text-foreground">Ball</span>
      <span className="text-primary pb-0.5 pl-0.5">+</span>
    </Link>
  );
}
