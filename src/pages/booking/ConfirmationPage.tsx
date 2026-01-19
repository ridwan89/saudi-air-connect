import { useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Plane, Calendar, User, Download, Home } from 'lucide-react';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const bookingRef = searchParams.get('ref') || '';

  const booking = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('lastBooking') || 'null');
    } catch {
      return null;
    }
  }, []);

  if (!booking) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-xl font-bold">Booking not found</p>
          <Button onClick={() => navigate('/')} className="mt-4">Search Flights</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="h-20 w-20 border-4 border-foreground bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your e-ticket has been sent to <strong>{booking.email}</strong>
          </p>
        </div>

        {/* Booking Reference */}
        <div className="p-6 border-2 border-foreground bg-secondary text-center mb-6">
          <p className="text-sm text-muted-foreground uppercase mb-1">Booking Reference</p>
          <p className="text-3xl font-bold font-mono tracking-wider">{booking.reference}</p>
        </div>

        {/* Booking Details Card */}
        <Card className="border-2 border-foreground mb-6">
          <CardContent className="p-0">
            {/* Flight Info */}
            <div className="p-6 border-b-2 border-foreground">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-5 w-5" />
                <span className="font-bold">{booking.flight.flightNumber}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{booking.flight.airline}</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{booking.flight.departure.airport.code}</p>
                  <p className="text-sm">{booking.flight.departure.airport.city}</p>
                  <p className="text-sm text-muted-foreground">{booking.flight.departure.time}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">{booking.flight.duration}</p>
                  <div className="w-24 h-0.5 bg-foreground my-2" />
                  <p className="text-xs text-muted-foreground">Direct</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{booking.flight.arrival.airport.code}</p>
                  <p className="text-sm">{booking.flight.arrival.airport.city}</p>
                  <p className="text-sm text-muted-foreground">{booking.flight.arrival.time}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {booking.flight.departure.date}
              </div>
            </div>

            {/* Passengers */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5" />
                <span className="font-bold">Passengers</span>
              </div>
              <div className="space-y-2">
                {booking.passengers.map((p: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm p-3 border-2 border-foreground bg-secondary">
                    <span>{p.title} {p.firstName} {p.lastName}</span>
                    {booking.seats?.[i] && (
                      <span className="font-mono">Seat {booking.seats[i].id}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            className="flex-1 border-2"
            onClick={() => window.print()}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
          <Link to="/" className="flex-1">
            <Button className="w-full shadow-sm">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Notice */}
        <div className="mt-8 p-4 border-2 border-foreground bg-muted text-sm">
          <p className="font-bold mb-2">Important Information</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Please arrive at the airport at least 3 hours before departure</li>
            <li>• Carry a valid ID/Passport matching your booking details</li>
            <li>• Online check-in opens 24 hours before departure</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
