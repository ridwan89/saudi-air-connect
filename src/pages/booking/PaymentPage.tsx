import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { BookingSteps } from '@/components/booking/BookingSteps';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockFlights, baggageOptions } from '@/data/mockData';
import { Seat } from '@/types/booking';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';

const BOOKING_STEPS = [
  { id: 1, label: 'Passengers' },
  { id: 2, label: 'Seats' },
  { id: 3, label: 'Baggage' },
  { id: 4, label: 'Payment' },
];

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const flightId = searchParams.get('flightId') || '';
  const passengerCount = parseInt(searchParams.get('passengers') || '1');
  
  const flight = mockFlights.find(f => f.id === flightId);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const storedPassengers = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('bookingPassengers') || '[]');
    } catch {
      return [];
    }
  }, []);

  const storedSeats: Seat[] = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('bookingSeats') || '[]');
    } catch {
      return [];
    }
  }, []);

  const storedBaggage = useMemo(() => {
    try {
      const arr = JSON.parse(sessionStorage.getItem('bookingBaggage') || '[]');
      return new Map(arr);
    } catch {
      return new Map();
    }
  }, []);

  const handlePayment = async () => {
    if (!email || !phone) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking reference
    const bookingRef = 'SB' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    // Store booking confirmation
    sessionStorage.setItem('lastBooking', JSON.stringify({
      reference: bookingRef,
      flight,
      passengers: storedPassengers,
      seats: storedSeats,
      email,
      phone,
    }));
    
    // Clear booking session data
    sessionStorage.removeItem('bookingPassengers');
    sessionStorage.removeItem('bookingSeats');
    sessionStorage.removeItem('bookingBaggage');
    
    navigate(`/booking/confirmation?ref=${bookingRef}`);
  };

  if (!flight) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-xl font-bold">Flight not found</p>
          <Button onClick={() => navigate('/')} className="mt-4">Search Flights</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <BookingSteps steps={BOOKING_STEPS} currentStep={4} />

        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Complete Your Booking</h1>
              <p className="text-muted-foreground">
                Review your details and proceed to payment.
              </p>
            </div>

            {/* Contact Information */}
            <Card className="border-2 border-foreground">
              <CardHeader className="border-b-2 border-foreground bg-secondary">
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  We'll send your e-ticket and booking confirmation here.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold uppercase text-xs">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="border-2 border-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-bold uppercase text-xs">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="border-2 border-foreground"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-2 border-foreground">
              <CardHeader className="border-b-2 border-foreground bg-secondary">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="p-4 border-2 border-foreground bg-muted text-center">
                  <Lock className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-bold">Secure Payment via Midtrans</p>
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to complete payment securely.
                  </p>
                </div>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Credit/Debit Cards, Bank Transfer, e-Wallets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Instant e-ticket delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="border-2"
                disabled={isProcessing}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={!email || !phone || isProcessing}
                className="flex-1 shadow-sm h-12 text-lg"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Pay Now
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <BookingSummary
              flight={flight}
              passengers={storedPassengers.map((p: any) => ({
                title: p.title,
                firstName: p.firstName || 'Passenger',
                lastName: p.lastName,
              }))}
              selectedSeats={storedSeats}
              baggageSelections={storedBaggage as Map<string, number>}
              baggageOptions={baggageOptions}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
