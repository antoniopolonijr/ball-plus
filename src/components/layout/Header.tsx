import { UserButton } from "@hexclave/next";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./Logo";
import { MainNavigation } from "./MainNavigation";

export function Header() {
  return (
    <header className="border-b bg-card px-4 py-3 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary navigation"
        className="flex items-center justify-between gap-2 sm:gap-4"
      >
        <Logo />

        <div className="flex items-center gap-0.5 sm:gap-2">
          <MainNavigation />

          <Separator orientation="vertical" />

          <ThemeToggle />

          <Separator orientation="vertical" />

          <UserButton />
        </div>
      </nav>
    </header>
  );
}
