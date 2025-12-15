import MainShell from "./MainShell";
import "./layout.scss";
import "./responsive.scss";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainShell>{children}</MainShell>;
}
