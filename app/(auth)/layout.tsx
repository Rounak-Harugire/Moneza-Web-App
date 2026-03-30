export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface relative overflow-hidden p-4">
      {/* Subtle animated gradient background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-fade-in" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-fade-in" />
      <div className="z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
