import { AlignLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import UserIcon from './UserIcon';
import { link } from 'fs';
import Link from 'next/link';
import { links } from '@/utils/links';
import SignOutLinks from './SignOutLinks';
import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton } from '@clerk/nextjs'


const DropdownListMenu = () => {
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <AlignLeft />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {/* ล็อคเอ้าแล้ว */}
        <SignedOut>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button>
                Login
              </button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button>
                Sign Up
              </button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        {/* ล็อคอินแล้ว ทำไรไรต่อ */}
        <SignedIn>
          <DropdownMenuSeparator />

          {
            links.map((item, index) => {
              return <DropdownMenuItem key={index}>
                <Link href={item.href}>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            })
          }
          {/* ปุ่มล็อคเอ้า */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLinks />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
export default DropdownListMenu