import { useState, useMemo } from 'react';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Flower2, MapPin, Package, DollarSign, Mail, Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango',
  'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
  'Yucatán', 'Zacatecas'
];

const TIPOS_FLORES = [
  { id: 'rosas', nombre: 'Rosas', precioBase: 25 },
  { id: 'girasoles', nombre: 'Girasoles', precioBase: 20 },
  { id: 'tulipanes', nombre: 'Tulipanes', precioBase: 30 },
  { id: 'lirios', nombre: 'Lirios', precioBase: 28 },
  { id: 'orquideas', nombre: 'Orquídeas', precioBase: 45 },
  { id: 'margaritas', nombre: 'Margaritas', precioBase: 18 },
  { id: 'claveles', nombre: 'Claveles', precioBase: 15 },
  { id: 'gerberas', nombre: 'Gerberas', precioBase: 22 },
  { id: 'alstroemerias', nombre: 'Alstroemerias', precioBase: 20 },
  { id: 'gardenias', nombre: 'Gardenias', precioBase: 35 }
];

const MULTIPLICADOR_REGION: Record<string, number> = {
  'Ciudad de México': 1.0,
  'Estado de México': 1.0,
  'Guadalajara': 1.05,
  'Monterrey': 1.1,
  'Puebla': 1.05,
  'Querétaro': 1.05,
  'default': 1.15
};

const getMultiplicadorRegion = (estado: string): number => {
  return MULTIPLICADOR_REGION[estado] || MULTIPLICADOR_REGION.default;
};

const Cotizador = () => {
  const { toast } = useToast();
  const [estado, setEstado] = useState('');
  const [tipoFlor, setTipoFlor] = useState('');
  const [cantidad, setCantidad] = useState('12');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [notas, setNotas] = useState('');

  const precioTotal = useMemo(() => {
    if (!tipoFlor || !cantidad || !estado) return 0;
    
    const flor = TIPOS_FLORES.find(f => f.id === tipoFlor);
    if (!flor) return 0;
    
    const multiplicador = getMultiplicadorRegion(estado);
    const cantidadNum = parseInt(cantidad) || 0;
    
    return flor.precioBase * cantidadNum * multiplicador;
  }, [tipoFlor, cantidad, estado]);

  const handleSolicitar = () => {
    if (!nombre || !email || !telefono || !estado || !tipoFlor || !cantidad) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: '¡Cotización enviada!',
      description: 'Nos pondremos en contacto contigo en las próximas 24 horas.',
      duration: 5000
    });

    // Reset form
    setNombre('');
    setEmail('');
    setTelefono('');
    setNotas('');
    setEstado('');
    setTipoFlor('');
    setCantidad('12');
  };

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-purple-600 to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cotizador de Flores
          </h1>
          <p className="text-xl text-white/95 max-w-2xl mx-auto">
            Obtén una cotización personalizada para tus arreglos florales en cualquier región de México
          </p>
        </div>
      </section>

      {/* Cotizador Section */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flower2 className="h-6 w-6 text-primary" />
                  Configura tu Cotización
                </CardTitle>
                <CardDescription>
                  Selecciona las opciones para tu arreglo floral
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Estado */}
                <div className="space-y-2">
                  <Label htmlFor="estado" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Estado de entrega *
                  </Label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Selecciona tu estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS_MEXICO.map(est => (
                        <SelectItem key={est} value={est}>{est}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Flor */}
                <div className="space-y-2">
                  <Label htmlFor="tipo-flor" className="flex items-center gap-2">
                    <Flower2 className="h-4 w-4 text-primary" />
                    Tipo de flor *
                  </Label>
                  <Select value={tipoFlor} onValueChange={setTipoFlor}>
                    <SelectTrigger id="tipo-flor">
                      <SelectValue placeholder="Selecciona el tipo de flor" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_FLORES.map(flor => (
                        <SelectItem key={flor.id} value={flor.id}>
                          {flor.nombre} - ${flor.precioBase} por tallo
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cantidad */}
                <div className="space-y-2">
                  <Label htmlFor="cantidad" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Cantidad de tallos *
                  </Label>
                  <Input
                    id="cantidad"
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="12"
                  />
                </div>

                <Separator />

                {/* Información de Contacto */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Información de Contacto</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Nombre completo *
                    </Label>
                    <Input
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Correo electrónico *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Teléfono *
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="55 1234 5678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notas">
                      Notas adicionales
                    </Label>
                    <textarea
                      id="notas"
                      value={notas}
                      onChange={(e) => setNotas(e.target.value)}
                      placeholder="Especificaciones especiales, colores preferidos, etc."
                      className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen de Cotización */}
            <div className="space-y-6">
              <Card className="border-2 border-secondary/20 bg-gradient-to-br from-muted/50 to-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-secondary" />
                    Resumen de Cotización
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {estado && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Estado:</span>
                      <span className="font-semibold">{estado}</span>
                    </div>
                  )}
                  
                  {tipoFlor && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tipo de flor:</span>
                      <span className="font-semibold">
                        {TIPOS_FLORES.find(f => f.id === tipoFlor)?.nombre}
                      </span>
                    </div>
                  )}
                  
                  {cantidad && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cantidad:</span>
                      <span className="font-semibold">{cantidad} tallos</span>
                    </div>
                  )}

                  {estado && tipoFlor && (
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Ajuste por región:</span>
                      <span>×{getMultiplicadorRegion(estado)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total Estimado:</span>
                    <span className="text-primary">
                      ${precioTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-accent/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      * Este es un precio estimado. El precio final puede variar según disponibilidad y temporada.
                    </p>
                  </div>

                  <Button 
                    onClick={handleSolicitar}
                    className="w-full text-lg py-6"
                    size="lg"
                  >
                    Solicitar Cotización
                  </Button>
                </CardContent>
              </Card>

              {/* Info adicional */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">¿Por qué varían los precios?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>Región:</strong> Los costos de transporte varían según la distancia</p>
                  <p>• <strong>Temporada:</strong> Algunas flores son más escasas en ciertas épocas</p>
                  <p>• <strong>Frescura:</strong> Garantizamos flores frescas directamente del cultivo</p>
                  <p>• <strong>Calidad:</strong> Trabajamos solo con los mejores proveedores</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-purple-600 to-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas ayuda personalizada?
          </h2>
          <p className="text-xl text-white/95 mb-8">
            Nuestro equipo está listo para asesorarte y crear el arreglo perfecto para tu ocasión especial
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
          >
            Contactar a un Asesor
          </Button>
        </div>
      </section>
    </EcommerceTemplate>
  );
};

export default Cotizador;