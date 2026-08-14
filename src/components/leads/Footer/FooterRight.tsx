import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function FooterRight() {
  return (
    <div>

      {/* Google Rating */}

      <div className="flex items-center gap-3">

        <Image
          src="/leads/google-rating.png"
          alt="Google Rating"
          width={220}
          height={80}
          className="object-contain"
        />

      </div>

      {/* Social Icons */}

      <div className="mt-8 flex items-center gap-4">

        <Link
          href="#"
          className="rounded-full border border-white/20 p-3 transition hover:bg-[#D49A34]"
        >
          <FaFacebookF size={18} />
        </Link>

        <Link
          href="#"
          className="rounded-full border border-white/20 p-3 transition hover:bg-[#D49A34]"
        >
          <FaInstagram size={18} />
        </Link>

        <Link
          href="#"
          className="rounded-full border border-white/20 p-3 transition hover:bg-[#D49A34]"
        >
          <FaXTwitter size={18} />
        </Link>

        <Link
          href="#"
          className="rounded-full border border-white/20 p-3 transition hover:bg-[#D49A34]"
        >
          <FaLinkedinIn size={18} />
        </Link>

        <Link
          href="#"
          className="rounded-full border border-white/20 p-3 transition hover:bg-[#D49A34]"
        >
          <FaYoutube size={18} />
        </Link>

      </div>

    </div>
  );
}
