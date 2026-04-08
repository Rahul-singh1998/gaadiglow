import { useQuery } from "@tanstack/react-query";
import { Booking } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function BookingHistory() {
  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive">Error loading bookings: {error.message}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mb-4 text-muted-foreground">
          <i className="fas fa-calendar-times text-4xl"></i>
        </div>
        <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
        <p className="text-muted-foreground mb-6">You haven't made any car wash bookings yet.</p>
        <Button asChild className="bg-primary hover:bg-secondary">
          <a href="/booking">Book Your First Wash</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Your Bookings</h3>
        <Button asChild className="bg-primary hover:bg-secondary">
          <a href="/booking">Book New Wash</a>
        </Button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded-lg overflow-hidden bg-white">
            <div className="border-b px-6 py-4 flex justify-between items-center bg-lightgray">
              <div>
                <span className="text-sm text-muted-foreground">Booking ID: #{booking.id}</span>
                <h4 className="font-medium">{booking.service}</h4>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusStyle(booking.status)}`}>
                  {booking.status}
                </span>
                <div className="text-sm text-muted-foreground mt-1">₹{booking.price}</div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div>{format(new Date(booking.date), "PPP")} at {booking.time}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Vehicle</div>
                <div>{booking.vehicleType} - {booking.vehicleModel}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="truncate">{booking.location}</div>
              </div>
            </div>
            
            <div className="border-t px-6 py-4 flex justify-end space-x-3">
              {booking.status === "Upcoming" && (
                <>
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="destructive" size="sm">Cancel</Button>
                </>
              )}
              {booking.status === "Completed" && (
                <Button variant="outline" size="sm">Book Again</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusStyle(status: string): string {
  switch (status) {
    case "Upcoming":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
