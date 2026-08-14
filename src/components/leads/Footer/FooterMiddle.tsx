import Link from "next/link";

const quickLinks = [
  "Home",
  "About",
  "Our Work",
  "Blogs",
  "Web Stories",
  "Contact",
  "Career",
];

const services = [
  "Digital Marketing",
  "Print Advertising",
  "Radio Advertising",
  "Creative Services",
  "Content Marketing",
  "Web Development",
  "Celebrity Endorsements",
  "Influencer Marketing",
];

export function FooterDescription() {
  return (
    <p className="max-w-3xl text-gray-300 leading-7">
      Accelerate your journey to success with result-oriented solutions for
      Digital Advertising, Social Media Management, SEO, and Compelling
      Content backed by more than 17 years of advertising wisdom with a wide
      array of clients spanning across all industries throughout the Indian
      subcontinent.
    </p>
  );
}

export function FooterQuickLinks() {
  return (
    <div>

      <h3 className="mb-3 text-xl font-semibold">
        Quick Links
      </h3>

      <ul className="space-y-1">

        {quickLinks.map((item) => (
          <li key={item}>
            <Link
              href="/"
              className="text-gray-300 transition hover:text-white"
            >
              {item}
            </Link>
          </li>
        ))}

      </ul>

    </div>
  );
}

export function FooterServices() {
  return (
    <div>

      <h3 className="mb-3 text-xl font-semibold">
        Services
      </h3>

      <ul className="space-y-1">

        {services.map((service) => (
          <li
            key={service}
            className="text-gray-300"
          >
            {service}
          </li>
        ))}

      </ul>

    </div>
  );
}
