import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandIntro from '@/components/BrandIntro';
import EditionsShowcase from '@/components/EditionsShowcase';
import FeaturedCollection from '@/components/FeaturedCollection';
import CategorySplit from '@/components/CategorySplit';
import SignatureFragrances from '@/components/SignatureFragrances';
import BrandStory from '@/components/BrandStory';
import Craftsmanship from '@/components/Craftsmanship';
import CollectionCTA from '@/components/CollectionCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <BrandIntro />
      <EditionsShowcase />
      <FeaturedCollection />
      <CategorySplit />
      <SignatureFragrances />
      <BrandStory />
      <Craftsmanship />
      <CollectionCTA />
      <Footer />
    </main>
  );
}
