import Footer from "@/components/leads/Footer/Footer";
import Navbar from "@/components/leads/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
