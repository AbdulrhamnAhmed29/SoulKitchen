import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BookingServices } from "../BookingServices/BookingServices"

export const useBooking = () => {

    const bookingData = useQuery({
        queryKey: ["bookingdata"],
        queryFn: BookingServices.getAllBooking,
        select: (data) => {
            const rawOrders = data.reservations || [];
            const Booking = Array.from(
                new Map(rawOrders.map(item => [item.documentId, item])).values()
            );
            return Booking
        }
    });


    const queryClient = useQueryClient(); // لازم تنادي الـ hook ده فوق

    const deleteMutation = useMutation({
        mutationFn: (id) => BookingServices.deleteBooking(id),

        onSuccess: () => {
            // "bookingdata" هو الـ QueryKey اللي أنت استخدمته في الـ useQuery فوق
            queryClient.invalidateQueries({ queryKey: ["bookingdata"] });
        },

        onError: (error) => {
            console.error("Error deleting booking:", error.message);
        }
    });


    return {
        bookingData: bookingData.data,
        isloading: bookingData.isLoading,

        // delete booking 
        deleteBooking: deleteMutation.mutate, 
        isDeleting: deleteMutation.isPending,

    }
}