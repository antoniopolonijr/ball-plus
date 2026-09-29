interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
