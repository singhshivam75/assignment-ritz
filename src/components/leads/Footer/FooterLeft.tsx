import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function FooterLeft() {
  return (
    <div className="border-r border-white/20 pr-10">

      {/* Logo */}

      <Image
        src="/leads/logo.png"
        alt="Ritz Media World"
        width={150}
        height={150}
        className="mb-10"
      />

      {/* Address */}

      <div className="mb-12">

        <h3 className="mb-2 text-xl font-semibold">
          Address
        </h3>

        <p className="leading-6 text-sm text-gray-300">
          402–404,
          <br />
          4th Floor, Corporate Park,
          <br />
          Tower A1,
          <br />
          Sector 142,
          <br />
          Noida, Uttar Pradesh
        </p>

      </div>

      {/* Email */}

      <div className="mb-8">

        <h3 className="mb-3 text-xl font-semibold">
          Email us
        </h3>

        <div className="flex items-center gap-4">

          <div className="rounded-full p-3">
            <Mail size={16} />
          </div>

          <a
            href="mailto:info@ritzmediaworld.com"
            className="text-gray-300 hover:text-white"
          >
            info@ritzmediaworld.com
          </a>

        </div>

      </div>

      {/* Phone */}

      <div>

        <h3 className="mb-3 text-xl font-semibold">
          Call us
        </h3>

        <div className="flex items-start gap-4">

          <div className="rounded-full p-3">
            <Phone size={20} />
          </div>

          <div className="space-y-2 text-gray-300">

            <a
              href="tel:+919220516777"
              className="block hover:text-white"
            >
              +91 9220516777
            </a>

            <a
              href="tel:+917290002168"
              className="block hover:text-white"
            >
              +91 7290002168
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}