import { Layout } from '@/components/layout/Layout';
import { FlightSearchForm } from '@/components/flight/FlightSearchForm';
import { Plane, Shield, Clock, CreditCard } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b-2 border-foreground bg-secondary">
        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background mb-6 font-mono text-sm">
              <Plane className="h-4 w-4" />
              SAUDI AIRLINES OFFICIAL PARTNER
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Book Your Flight<br />With Confidence
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Search, compare, and book Saudi Airlines flights with transparent pricing and instant confirmation.
            </p>
          </div>

          {/* Search Form Card */}
          <div className="max-w-4xl mx-auto">
            <div className="border-2 border-foreground bg-background p-6 md:p-8 shadow-md">
              <FlightSearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 border-2 border-foreground bg-background hover:shadow-sm transition-shadow">
              <div className="h-12 w-12 border-2 border-foreground bg-primary flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
              <p className="text-muted-foreground">
                Your payments are protected with bank-grade encryption and verified transactions.
              </p>
            </div>

            <div className="p-6 border-2 border-foreground bg-background hover:shadow-sm transition-shadow">
              <div className="h-12 w-12 border-2 border-foreground bg-primary flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
              <p className="text-muted-foreground">
                Receive your e-ticket immediately after payment with complete booking details.
              </p>
            </div>

            <div className="p-6 border-2 border-foreground bg-background hover:shadow-sm transition-shadow">
              <div className="h-12 w-12 border-2 border-foreground bg-primary flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                No hidden fees. What you see is what you pay, with clear price breakdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y-2 border-foreground bg-secondary py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <p className="text-4xl font-bold font-mono">50K+</p>
              <p className="text-sm text-muted-foreground uppercase mt-1">Flights Booked</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-mono">98%</p>
              <p className="text-sm text-muted-foreground uppercase mt-1">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-mono">24/7</p>
              <p className="text-sm text-muted-foreground uppercase mt-1">Support</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-mono">100+</p>
              <p className="text-sm text-muted-foreground uppercase mt-1">Destinations</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
