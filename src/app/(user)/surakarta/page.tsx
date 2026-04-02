import LocationPage from "@/components/sections/LocationPage";
import surakartaData from "@/lib/surakartaData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: surakartaData.metaTitle,
  description: surakartaData.metaDescription,
};

export default function SurakartaPage() {
  return <LocationPage data={surakartaData} />;
}