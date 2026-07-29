import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Governance Votes Prototype",
  description: "Interactive governance voting and claiming prototype.",
  openGraph: { title:"Governance Votes", description:"Interactive Prototype", images:["/og.png"] },
  twitter: { card:"summary_large_image", title:"Governance Votes", description:"Interactive Prototype", images:["/og.png"] },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
