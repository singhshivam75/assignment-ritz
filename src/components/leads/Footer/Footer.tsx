import FooterLeft from "./FooterLeft";
import {
  FooterDescription,
  FooterQuickLinks,
  FooterServices,
} from "./FooterMiddle";
import FooterRight from "./FooterRight";
import FooterPartners from "./FooterPartners";

export default function Footer() {
  return (
    <footer className="bg-[#171B4A] text-white py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-[28%_72%]">

        <FooterLeft />

        <div className="pl-10">

          <FooterDescription />

          <div className="mt-8 grid grid-cols-3 gap-x-12">

            <FooterQuickLinks />

            <FooterServices />

            <div className="row-span-2">
              <FooterRight />
            </div>

            <div className="col-span-2 mt-10">
              <FooterPartners />
            </div>

          </div>

          {/* Copyright */}

          <div className="mt-14 border-t border-white/20 pt-6">

            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ritz Media World. All Rights Reserved.
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}
