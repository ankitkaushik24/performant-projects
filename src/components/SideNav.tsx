"use client";

import {
  BarChart,
  Home,
  Menu,
  Package,
  Settings,
  Table,
  Timer,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";
import { useIsMobile } from "./IsMobileProvider";

const TITLE = "Applications";

const navItems = [
  { name: "Datatable", href: "/datatable", icon: Table },
  { name: "Products", href: "/products", icon: Package },
  { name: "Stopwatch", href: "/stopwatch", icon: Timer },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="mt-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
              pathname === item.href ? "bg-gray-200" : ""
            }`}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

/* Desktop Side Navigation */
const DesktopSideNav = ({ title = TITLE }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <aside className="w-64 shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <NavItems />
    </aside>
  );
};

/* Mobile Side Navigation */
const MobileSideNav = ({ title = TITLE }) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <SheetClose asChild>
          <NavItems />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export { DesktopSideNav, MobileSideNav };
