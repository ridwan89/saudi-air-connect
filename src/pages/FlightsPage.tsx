import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { FlightCard } from '@/components/flight/FlightCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockFlights, airports } from '@/data/mockData';
import { Flight } from '@/types/booking';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';

export default function FlightsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = parseInt(searchParams.get('passengers') || '1');
  
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterClass, setFilterClass] = useState<string>('all');

  const originAirport = airports.find(a => a.code === origin);
  const destAirport = airports.find(a => a.code === destination);

  // Filter flights based on search params (simplified mock matching)
  const filteredFlights = useMemo(() => {
    let flights = mockFlights.filter(f => {
      if (origin && f.departure.airport.code !== origin) return false;
      if (destination && f.arrival.airport.code !== destination) return false;
      if (filterClass !== 'all' && f.class !== filterClass) return false;
      return true;
    });

    // Sort
    flights.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'departure') return a.departure.time.localeCompare(b.departure.time);
      return 0;
    });

    return flights;
  }, [origin, destination, sortBy, filterClass]);

  const handleSelectFlight = (flight: Flight) => {
    const params = new URLSearchParams({
      flightId: flight.id,
      passengers: passengers.toString(),
    });
    navigate(`/booking/passengers?${params.toString()}`);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Search
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {originAirport?.city || origin} → {destAirport?.city || destination}
              </h1>
              <p className="text-muted-foreground">
                {departureDate} • {passengers} passenger{passengers > 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-32 border-2 border-foreground">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-2 border-foreground">
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="w-36 border-2 border-foreground">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-2 border-foreground">
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="departure">Earliest</SelectItem>
                  <SelectItem value="duration">Shortest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredFlights.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground font-mono">
              {filteredFlights.length} flight{filteredFlights.length > 1 ? 's' : ''} found
            </p>
            {filteredFlights.map((flight) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onSelect={handleSelectFlight}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-foreground bg-secondary">
            <p className="text-xl font-bold mb-2">No flights found</p>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or selecting different dates.
            </p>
            <Button onClick={() => navigate('/')}>Search Again</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
