import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-card">
      <CardContent className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="text-muted-foreground text-sm">Sin imagen</span>
            </div>
          )}
          
          {/* Floating Badge */}
          {collection.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-accent text-accent-foreground text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                ⭐ Destacado
              </span>
            </div>
          )}
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
              {collection.name}
            </h3>
          </div>
        </div>
        
        <div className="p-6 bg-card">
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all"
            onClick={() => onViewProducts(collection.id)}
          >
            Ver Talleres
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}