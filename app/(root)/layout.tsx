// import MobileNav from "@/components/MobileNav";
// import Sidebar from "@/components/Sidebar";
import React from "react";
// import TopNavbar from "@/components/TopNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="relative h-full w-full font-inter bg-gray-100">
      {/* Top Navigation */}
      {/* <TopNavbar /> */}

      {/* Main layout with Sidebar and Content */}
      <main className="flex h-full bg-gray-100">
        {" "}
        {/* Add padding-top to offset TopNav */}
        {/* <Sidebar /> */}
        <div className="flex-grow">
          {/* Mobile Navigation */}
          <div className="block lg:hidden">
            {/* <MobileNav user={loggedInUser} /> */}
          </div>

          {/* Main content */}
          <div className="p-4">{children}</div>
        </div>
      </main>
    </div>
  );
}



// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import theme from "@/constant/theme";
// import { ReactNode } from "react";

// export const metadata: Metadata = {
//   title: "HeyFood Africa",
//   description: "Discover and enjoy the best food experiences across Africa.",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

