import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CallToAction from "./CallToAction";
import HomeActions from "./HomeActions";
import HomeBenefits from "./HomeBenefits";
import HomeIntro from "./HomeIntro";
import HowItWorks from "./HowItWorks";
import TeamGeneratorPreview from "./TeamGeneratorPreview";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 lg:pt-2">
      <section
        aria-labelledby="home-title"
        className="grid items-center gap-6 lg:grid-cols-[0.6fr_1.4fr]"
      >
        <div className="flex flex-col items-start gap-6">
          <HomeIntro />
          <HomeActions />
          <HomeBenefits />
        </div>

        <TeamGeneratorPreview />
      </section>

      <Separator />

      <HowItWorks />

      <CallToAction />

      <nav className="flex justify-center">
        <Button asChild variant="ghost" className="text-muted-foreground">
          <Link href="/games">
            Manage your saved games
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </nav>
    </div>
  );
}
