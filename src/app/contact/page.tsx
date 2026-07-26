import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Angazi Concepts team.",
};

export default function ContactPage() {
  return (
    <div className="bg-mist/40 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-3 text-ink/60">
            Questions, feedback or partnership ideas — we&rsquo;d love to hear
            from you.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-2xl border border-ink/[0.06] bg-white p-8 shadow-card">
            <ContactForm />
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl bg-forest p-6 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Phone size={18} className="text-lime" />
              </div>
              <p className="mt-3 text-sm text-white/60">Call us</p>
              <a href="tel:+2349017247375" className="focus-ring font-semibold hover:text-lime">
                +234 901 724 7375
              </a>
            </div>
            <div className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-forest">
                <Mail size={18} />
              </div>
              <p className="mt-3 text-sm text-ink/50">Email us</p>
              <a
                href="mailto:contact@angaziconcepts.com"
                className="focus-ring font-semibold text-ink hover:text-forest"
              >
                contact@angaziconcepts.com
              </a>
            </div>
            <div className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-forest">
                <MapPin size={18} />
              </div>
              <p className="mt-3 text-sm text-ink/50">Based in</p>
              <p className="font-semibold text-ink">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
