import { Plane, Clock, Luggage, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flight } from '@/types/booking';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  const classLabel = {
    economy: 'Economy',
    business: 'Business',
    first: 'First Class',
  };

  return (
    <Card className="border-2 border-foreground shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Airline Info */}
          <div className="flex items-center gap-3 md:w-40">
            <div className="h-12 w-12 border-2 border-foreground bg-secondary flex items-center justify-center shrink-0">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold">{flight.airline}</p>
              <p className="text-sm text-muted-foreground font-mono">{flight.flightNumber}</p>
            </div>
          </div>

          {/* Flight Times */}
          <div className="flex-1">
            <div className="flex items-center gap-4 md:gap-8">
              {/* Departure */}
              <div className="text-center">
                <p className="text-2xl font-bold font-mono">{flight.departure.time}</p>
                <p className="text-sm font-bold">{flight.departure.airport.code}</p>
                <p className="text-xs text-muted-foreground">{flight.departure.airport.city}</p>
              </div>

              {/* Duration */}
              <div className="flex-1 flex flex-col items-center">
                <p className="text-xs text-muted-foreground mb-1">{flight.duration}</p>
                <div className="w-full flex items-center gap-1">
                  <div className="h-0.5 flex-1 bg-foreground" />
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Direct</p>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <p className="text-2xl font-bold font-mono">{flight.arrival.time}</p>
                <p className="text-sm font-bold">{flight.arrival.airport.code}</p>
                <p className="text-xs text-muted-foreground">{flight.arrival.airport.city}</p>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 md:w-32">
            <Badge variant="outline" className="border-2">
              <Clock className="h-3 w-3 mr-1" />
              {flight.duration}
            </Badge>
            <Badge variant="secondary" className="border-2 border-foreground">
              {classLabel[flight.class]}
            </Badge>
          </div>

          {/* Price & Select */}
          <div className="flex flex-col items-end gap-2 md:w-40">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-2xl font-bold">
                {flight.currency} {flight.price.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">per passenger</p>
            </div>
            <Button 
              onClick={() => onSelect(flight)} 
              className="w-full md:w-auto shadow-xs"
            >
              Select Flight
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-foreground flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Plane className="h-4 w-4" />
            {flight.aircraft}
          </div>
          <div className="flex items-center gap-1">
            <Luggage className="h-4 w-4" />
            {flight.seatsAvailable} seats available
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
