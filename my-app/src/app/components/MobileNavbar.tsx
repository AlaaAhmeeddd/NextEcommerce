"use client"

import { Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { links } from "./Navbar"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MobileNavbar() {
    const pathname = usePathname();
    return (
        <div className="lg:hidden block">
            <Sheet>
                <SheetTrigger asChild>
                    <MenuIcon className="cursor-pointer"/>
                </SheetTrigger>
                <SheetContent side={"top"}>
                    <ul className="flex flex-col gap-6 items-center justify-center mt-16 mb-10">
                        {links.map((link, index)=>(
                            <li key={index}>
                                {pathname === link.href ? (
                                    <Link
                                        className="text-lg font-semibold text-primary"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </div>
    )
}
