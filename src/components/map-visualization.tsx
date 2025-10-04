import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Map, MapPin, AlertTriangle, Leaf } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function MapVisualization() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'city-map');

  const markers = [
    { id: 1, top: '25%', left: '40%', icon: <AlertTriangle className="h-5 w-5 text-destructive" />, tooltip: 'High UHI Effect Zone' },
    { id: 2, top: '60%', left: '30%', icon: <Leaf className="h-5 w-5 text-green-500" />, tooltip: 'New Green Space' },
    { id: 3, top: '55%', left: '70%', icon: <MapPin className="h-5 w-5 text-blue-500" />, tooltip: 'Proposed Cooling Center' },
    { id: 4, top: '75%', left: '50%', icon: <AlertTriangle className="h-5 w-5 text-destructive" />, tooltip: 'Flood Prone Area' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Map className="h-5 w-5 text-primary" />
        <CardTitle className="font-headline text-lg">City Vulnerability Map</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/10"></div>
            {markers.map(marker => (
              <Tooltip key={marker.id}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 transform animate-pulse cursor-pointer"
                    style={{ top: marker.top, left: marker.left }}
                  >
                    <div className="relative rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
                      {marker.icon}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{marker.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
