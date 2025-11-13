export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LinguaChat",
    description:
      "AI-powered language learning platform for practicing conversations in Spanish, French, German, Italian, and Japanese",
    url: "https://ai-language-learning-raj.vercel.app",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI-powered conversations",
      "Real-time grammar corrections",
      "Vocabulary tracking",
      "Multiple difficulty levels",
      "7 practice scenarios",
      "5 languages supported",
    ],
    inLanguage: ["en", "es", "fr", "de", "it", "ja"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
    creator: {
      "@type": "Organization",
      name: "LinguaChat Team",
      url: "https://ai-language-learning-raj.vercel.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
