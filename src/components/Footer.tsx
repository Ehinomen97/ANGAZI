import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/find-work", label: "Find Work" },
  { href: "/become-agent", label: "Become an Agent" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const forWorkers = [
  { href: "/signup", label: "Create Profile" },
  { href: "/find-work", label: "Find Jobs" },
  { href: "/about", label: "How It Works" },
  { href: "/about", label: "Safety Tips" },
];

const forEmployers = [
  { href: "/find-workers", label: "Post a Job" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/about", label: "How It Works" },
  { href: "/contact", label: "Pricing" },
];

const company = [
  { href: "/about", label: "Our Mission" },
  { href: "/about", label: "Our Vision" },
  { href: "/contact", label: "Terms of Service" },
  { href: "/contact", label: "Privacy Policy" },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="container-page grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <img src="/logo-mark.png" alt="Angazi Concepts" className="h-10 w-10" />
          <p className="mt-4 max-w-xs text-lg font-semibold text-lime">
            Build Trust. Deliver Excellence.
          </p>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            Connecting People. Creating Opportunities.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-lime hover:text-forest"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" links={quickLinks} />
        <FooterCol title="For Workers" links={forWorkers} />
        <FooterCol title="For Employers" links={forEmployers} />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-lime" />
              <a href="tel:+2349017247375" className="focus-ring hover:text-white">
                +234 901 724 7375
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-lime" />
              <a
                href="mailto:contact@angaziconcepts.com"
                className="focus-ring hover:text-white"
              >
                contact@angaziconcepts.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-lime" />
              <span>Lagos, Nigeria</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Angazi Concepts. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="focus-ring hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="focus-ring hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="focus-ring hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
