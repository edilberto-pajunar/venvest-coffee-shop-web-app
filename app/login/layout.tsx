import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Coffee Shop Dashboard",
  description: "Admin login for Coffee Shop Dashboard",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
