import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import LoadingSpinner from "@/components/loadingSpinner";

export default function App({ Component, pageProps }: AppProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth === undefined || auth === null) {
      router.push("/login").then(() => {
        setHasMounted(true);
      });
    } else {
      if (router.pathname === "" || router.pathname === "/") {
        router.push("/dashboard").then(() => {
          setHasMounted(true);
        });
      } else {
        router.push(router.pathname).then(() => {
          setHasMounted(true);
        });
      }
    }
  }, []);

  return (
    <Provider store={store}>
      {hasMounted ? (
        <Component {...pageProps} />
      ) : (
        <LoadingSpinner size="large" />
      )}
    </Provider>
  );
}
