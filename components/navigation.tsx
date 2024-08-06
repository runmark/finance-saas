'use client';

import { useMedia } from "react-use";
import NavButton from "./nav-button";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";


const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },
];

const Navigation = () => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    const isMobile = useMedia('(max-width: 1024px)', false);

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        size="sm"
                        variant="outline"
                        className="font-normal text-white/10 bg-white/20 hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4"></Menu>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => {
                            return (
                                <Button
                                    key={route.href}
                                    variant={route.href === pathname ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                // onClick={() => onClick(route.href)}
                                >
                                    <Link href={route.href}>
                                        {route.label}
                                    </Link>
                                </Button>
                            )
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    );
}

export default Navigation;