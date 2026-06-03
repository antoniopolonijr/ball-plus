import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer>
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Button asChild className="mt-8">
          <Link href="/">Go Home</Link>
        </Button>
      </section>
    </PageContainer>
  );
}
