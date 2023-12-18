import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth === undefined || auth === null) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);
  return <Component {...pageProps} />;
}
