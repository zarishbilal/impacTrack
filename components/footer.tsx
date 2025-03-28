import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-900 text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">ImpacTrack</h3>
            <p className="text-sm text-slate-300">
              Connecting volunteers with meaningful opportunities to make a difference in their communities.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">For Volunteers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/opportunities" className="text-slate-300 hover:text-white">
                  Find Opportunities
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-slate-300 hover:text-white">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-slate-300 hover:text-white">
                  Track Impact
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-slate-300 hover:text-white">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">For Organizations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/organizations/register" className="text-slate-300 hover:text-white">
                  Register Organization
                </Link>
              </li>
              <li>
                <Link href="/organizations/post" className="text-slate-300 hover:text-white">
                  Post Opportunities
                </Link>
              </li>
              <li>
                <Link href="/organizations/dashboard" className="text-slate-300 hover:text-white">
                  Organization Dashboard
                </Link>
              </li>
              <li>
                <Link href="/organizations/resources" className="text-slate-300 hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-slate-300">
              Subscribe to our newsletter for the latest volunteer opportunities and updates.
            </p>
            <form className="flex space-x-2">
              <Input placeholder="Email address" type="email" className="max-w-[220px]" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-300">© {new Date().getFullYear()} ImpacTrack. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-slate-300">
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

