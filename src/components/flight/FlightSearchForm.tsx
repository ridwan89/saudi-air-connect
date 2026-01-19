import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRightLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { airports } from '@/data/mockData';

export function FlightSearchForm() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [flightClass, setFlightClass] = useState('economy');

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      origin,
      destination,
      departureDate,
      returnDate: returnDate || '',
      passengers,
      class: flightClass,
      tripType,
    });
    navigate(`/flights?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      {/* Trip Type Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={tripType === 'one-way' ? 'default' : 'outline'}
          onClick={() => setTripType('one-way')}
        >
          One Way
        </Button>
        <Button
          type="button"
          variant={tripType === 'round-trip' ? 'default' : 'outline'}
          onClick={() => setTripType('round-trip')}
        >
          Round Trip
        </Button>
      </div>

      {/* Origin & Destination */}
      <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr]">
        <div className="space-y-2">
          <Label htmlFor="origin" className="flex items-center gap-2 font-bold uppercase text-xs">
            <Plane className="h-4 w-4 rotate-[-45deg]" />
            From
          </Label>
          <Select value={origin} onValueChange={setOrigin} required>
            <SelectTrigger id="origin" className="border-2 border-foreground h-12">
              <SelectValue placeholder="Select departure city" />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-foreground">
              {airports.map((airport) => (
                <SelectItem key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end justify-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="h-12 w-12 border-2"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination" className="flex items-center gap-2 font-bold uppercase text-xs">
            <Plane className="h-4 w-4 rotate-45" />
            To
          </Label>
          <Select value={destination} onValueChange={setDestination} required>
            <SelectTrigger id="destination" className="border-2 border-foreground h-12">
              <SelectValue placeholder="Select arrival city" />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-foreground">
              {airports.map((airport) => (
                <SelectItem key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dates, Passengers, Class */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="departure" className="flex items-center gap-2 font-bold uppercase text-xs">
            <Calendar className="h-4 w-4" />
            Departure
          </Label>
          <Input
            id="departure"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            className="border-2 border-foreground h-12"
          />
        </div>

        {tripType === 'round-trip' && (
          <div className="space-y-2">
            <Label htmlFor="return" className="flex items-center gap-2 font-bold uppercase text-xs">
              <Calendar className="h-4 w-4" />
              Return
            </Label>
            <Input
              id="return"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="border-2 border-foreground h-12"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="passengers" className="flex items-center gap-2 font-bold uppercase text-xs">
            <Users className="h-4 w-4" />
            Passengers
          </Label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger id="passengers" className="border-2 border-foreground h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-foreground">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="class" className="font-bold uppercase text-xs">
            Class
          </Label>
          <Select value={flightClass} onValueChange={setFlightClass}>
            <SelectTrigger id="class" className="border-2 border-foreground h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-2 border-foreground">
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-md">
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </Button>
    </form>
  );
}
