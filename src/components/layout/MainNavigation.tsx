"use client";

import { FolderOpen, House, Zap } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNavigation() {
  return (
    <NavigationMenu className="pr-2">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem className="hidden sm:inline">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/"
              aria-label="Home Page"
              className="border-1 sm:border-none"
            >
              <House aria-hidden="true" className="size-4" />
              <span>Home</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/games"
              aria-label="My Games"
              className="border-1 sm:border-none"
            >
              <FolderOpen aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">My Games</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/quick-game"
              aria-label="Quick Game"
              className="border-1 sm:border-none"
            >
              <Zap aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Quick Game</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
