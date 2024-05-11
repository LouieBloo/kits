import MainLayout from "@/components/layouts/main-layout";
import { UserProvider, useUser } from "@/contexts/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <UserProvider>
        <AuthenticationRouter>
          <Component {...pageProps} />
        </AuthenticationRouter>
      </UserProvider>
    </main>
  );
}

// If the user is not logged in we move them to the login page, else render the children like normal
function AuthenticationRouter({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [user.isAuthenticated, router]);

  return <MainLayout>{children}</MainLayout>;
}
