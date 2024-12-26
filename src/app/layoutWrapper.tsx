"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { Store } from "../reduxStore/store";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/signup", "/login"];
  const shouldShowLayout = !noLayoutRoutes.includes(pathname);

  return (
    <>
        <Toaster />
      <Provider store={Store}>
      {shouldShowLayout && <Header />}
      {children}
      {shouldShowLayout && <Footer />}
      </Provider >
    </>
  );
}
