import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth === undefined || auth === null) {
      router.push("/login");
    } else {
      router.push(router.pathname);
    }
  }, []);

  const isNotMenu = router.pathname === "/login";

  if (isNotMenu) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
