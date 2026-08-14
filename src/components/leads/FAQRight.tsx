"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "01",
    question:
      "What is Ritz Media World's response time to an inquiry?",
    answer:
      "Ritz Media World aims to respond to all queries within 4 business hours during business days.\n\nFor urgent needs you can connect with us on call at +91 9220516777. Our operating hours are Monday–Friday, 9:30AM – 6:30PM.",
  },
  {
    id: "02",
    question:
      "Does Ritz Media World work with startups and small businesses?",
    answer:
      "Yes. We work with startups, SMEs and enterprise clients across India.",
  },
  {
    id: "03",
    question:
      "What does Ritz Media's free brand consultation include?",
    answer:
      "A discussion about your goals, audience, marketing challenges and strategy recommendations.",
  },
  {
    id: "04",
    question:
      "Can I hire a single service from Ritz Media?",
    answer:
      "Yes, you can choose one service or multiple services depending on your requirements.",
  },
  {
    id: "05",
    question:
      "How do you measure campaign success?",
    answer:
      "We track KPIs such as leads, traffic, engagement, conversions and ROI.",
  },
  {
    id: "06",
    question:
      "Does Ritz Media work with clients beyond Noida and Delhi NCR?",
    answer:
      "Yes. We serve clients across India and internationally.",
  },
  {
    id: "07",
    question:
      "What industries does Ritz Media serve?",
    answer:
      "Healthcare, Real Estate, Education, Technology, Retail, Hospitality and more.",
  },
];

export default function FAQRight() {
  const [open, setOpen] = useState(0);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#202868]">

      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className={`border-b border-[#202868] last:border-0 ${
            open === index ? "bg-[#202868] text-white" : "bg-white"
          }`}
        >
          <button
            onClick={() =>
              setOpen(open === index ? -1 : index)
            }
            className="flex w-full items-start gap-5 px-10 py-5 text-left"
          >
            <span className="text-2xl font-semibold">
              {faq.id}
            </span>

            <div className="flex-1">

              <h3 className="text-[22px] font-semibold">
                {faq.question}
              </h3>

              {open === index && (
                <p className="mt-5 whitespace-pre-line text-md leading-7 text-gray-200">
                  {faq.answer}
                </p>
              )}

            </div>

            {open === index ? (
              <Minus size={20} />
            ) : (
              <Plus size={20} />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}