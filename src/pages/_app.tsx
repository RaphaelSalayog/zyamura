import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import LoadingSpinner from "@/components/loadingSpinner";
import MainLayout from "@/components/layout/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const isAuth = useCallback(async () => {
    const auth = localStorage.getItem("token");
    try {
      // const response = await fetch("http://localhost:3000/login", {
      //   headers: {
      //     Authorization: "Bearer " + auth,
      //   },
      // });
      // await response.json(); // automatically set the token and other data to localStorage

      // if (auth === undefined || auth === null || !response.ok)
      if (auth === undefined || auth === null) {
        localStorage.removeItem("token");
        router.push("/login").then(() => {
          setHasMounted(true);
        });
      } else {
        if (
          router.pathname === "" ||
          router.pathname === "/" ||
          router.pathname === "/login"
        ) {
          router.push("/dashboard").then(() => {
            setHasMounted(true);
          });
        } else {
          router.push(router.pathname).then(() => {
            setHasMounted(true);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [router.pathname]);

  useEffect(() => {
    isAuth();
  }, [router.pathname]);

  if (router.pathname === "/login") {
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

  return (
    <Provider store={store}>
      {hasMounted ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <LoadingSpinner size="large" />
      )}
    </Provider>
  );
}
