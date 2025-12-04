import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}
export const IndexUI = ({
  logic
}: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts
  } = logic;
  return (
    (<EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="/videos/hero-flowers-poster.jpg">
            <source src="/videos/hero-flowers.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-purple-600/80 to-secondary/90" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{
              letterSpacing: '0px',
              color: '#52c178',
              fontSize: '54px',
              fontWeight: '900',
            }}>Talleres de Flores nimabay!</h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-md animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            Aprende el arte floral con nuestros talleres creativos. Diseña, crea y lleva a casa hermosas creaciones florales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-full shadow-xl"
              onClick={() => document.getElementById('products')?.scrollIntoView({
                behavior: 'smooth'
              })}
              style={{
                letterSpacing: '0px',
              }}>Ver Talleres hoy</Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 rounded-full shadow-xl" onClick={() => document.getElementById('collections')?.scrollIntoView({
            behavior: 'smooth'
            })} style={{
            color: "#7f2f2f",
              letterSpacing: "0px",
            borderWidth: "1px"
          }}>
              Explorar Colecciones
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </section>
            {/* Collections Section */}
              {!loadingCollections && collections.length > 0 && <section id="collections" className="py-20 bg-gradient-to-b from-background to-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Nuestras Colecciones
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Elige la experiencia perfecta para ti, desde talleres para principiantes hasta técnicas avanzadas
              </p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map(collection => <CollectionCard key={collection.id} collection={collection} onViewProducts={handleViewCollectionProducts} />)}
            </div>
          </div>
        </section>}
          {/* Products Section */}
            <section id="products" className="py-20 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {selectedCollectionId ? `${collections.find(c => c.id === selectedCollectionId)?.name}` : 'Nuestros Talleres'}
            </h2>
            <p className="text-lg text-muted-foreground">
              Reserva tu lugar en nuestros talleres creativos
            </p>
              </div>
                
              {selectedCollectionId && <div className="flex justify-center mb-8">
              <Button variant="outline" onClick={handleShowAllProducts} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver Todos los Talleres
              </Button>
              </div>}
            
              {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>)}
              </div> : filteredProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div> : <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available.
              </p>
            </div>}
        </div>
      </section>
      {/* Newsletter Section */}
      <NewsletterSection />
      <FloatingCart />
    </EcommerceTemplate>)
  );
};