import { address, brand, founded, hours, phones, siteUrl, social } from "@/content/site";

/** Schema.org Restaurant (LocalBusiness). Le valutazioni aggregate non vengono dichiarate: Google non le accetta se auto-pubblicate. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: brand.name,
    url: siteUrl,
    telephone: phones.main.display.replace(/\s/g, ""),
    image: `${siteUrl}/og.png`,
    servesCuisine: ["Cucina campana", "Cucina sannita", "Italiana", "Carne alla brace"],
    priceRange: "€€",
    foundingDate: String(founded.year),
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.province,
      addressCountry: address.country,
    },
    openingHoursSpecification: hours.days.flatMap((d) =>
      d.slots.map((s) => {
        const [opens, closes] = s.split("–");
        return { "@type": "OpeningHoursSpecification", dayOfWeek: d.schemaDay, opens, closes };
      }),
    ),
    sameAs: [social.instagram, social.facebook, social.tripadvisor],
    hasMenu: `${siteUrl}/menu/`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
