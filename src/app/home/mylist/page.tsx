import { Metadata } from "next";
import MyListPage from "@/components/pages/MyList";

export const metadata: Metadata = {
  title: "My List - Netflix",
};

export default function Page() {
  return <MyListPage />;
}
