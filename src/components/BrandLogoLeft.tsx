export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center gap-3 group">
      <img 
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/d3be723b-de9a-4917-b05f-3103d5848524/logo-no-background.png"
        alt="Talleres de Flores Logo" 
        className="h-12 w-12 object-contain group-hover:scale-110 transition-transform"
      />
      <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
        Talleres de Flores
      </span>
    </a>
  )
}