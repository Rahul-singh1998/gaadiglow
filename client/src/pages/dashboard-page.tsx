import { useAuth } from "@/hooks/use-auth";
import { Helmet } from "react-helmet";
import BookingHistory from "@/components/dashboard/booking-history";
import ProfileSection from "@/components/dashboard/profile-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>My Dashboard - GaadiGlow</title>
        <meta name="description" content="Manage your GaadiGlow account, view booking history, and update your profile." />
      </Helmet>
      
      <div className="bg-white py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="font-bold text-3xl md:text-4xl mb-2">My Dashboard</h1>
              <p className="text-darkgray">Welcome back, {user?.username}!</p>
            </div>
            
            <Tabs defaultValue="bookings" className="space-y-6">
              <div className="border-b">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="bookings" className="text-lg py-3 px-6">My Bookings</TabsTrigger>
                  <TabsTrigger value="profile" className="text-lg py-3 px-6">Profile</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="bookings">
                <Card className="border-none shadow-none p-0">
                  <BookingHistory />
                </Card>
              </TabsContent>
              
              <TabsContent value="profile">
                <Card className="border-none shadow-none p-0">
                  <ProfileSection />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
