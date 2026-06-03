import { Globe, Mail } from "lucide-react";
import Link from "next/link";
import { IoLogoLinkedin } from "react-icons/io";
import { SiGithub } from "react-icons/si";

import { PageContainer } from "@/components/layout/PageContainer";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    href: "https://antoniopolonijr.github.io/index.html",
    label: "Portfolio",
    icon: Globe,
  },
  {
    href: "https://www.linkedin.com/in/antonio-br%C3%A1s-poloni-j%C3%BAnior-27148390/",
    label: "LinkedIn",
    icon: IoLogoLinkedin,
  },
  {
    href: "https://github.com/antoniopolonijr",
    label: "GitHub",
    icon: SiGithub,
  },
  {
    href: "mailto:antoniopolonijr@gmail.com",
    label: "Email",
    icon: Mail,
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t">
      <PageContainer>
        <div className="flex flex-col gap-3 py-4 text-sm text-muted-foreground items-center sm:flex-row sm:justify-between">
          <p>Created by Antonio Poloni © {currentYear}</p>

          <nav aria-label="Social links">
            <ul className="flex flex-row gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" />

                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </PageContainer>
    </footer>
  );
}
