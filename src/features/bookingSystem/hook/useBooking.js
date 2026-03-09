import { useMutation } from "@tanstack/react-query"
import { bookingSystem } from "../services/BookingServices"

export const useCreateReservations = () => {
    const userId = localStorage.getItem("userId")
    const createBookingMutation = useMutation({
        mutationFn: async (data) => {
            // 1. booking
            const create_reservations = await bookingSystem.createReservation({
                reservation_date: data.reservation_date,
                statustable: "Pending",
                users_permissions_user: userId,
                guests_count: data.guests_count,
                phone:data.phone,
               
            });

            const reservationsId = create_reservations?.data?.documentId || create_reservations?.documentId;

            // 2. create table
            const create_table = await bookingSystem.createTable({
                table_number: data.table_number,
                capacity:"2",
                "reservations": reservationsId
            });

            // 3. create time slot 
            const create_Time_Slot = await bookingSystem.createTime_Slot({
                time: data.slot_name,
                start_time: data.start_time,
                end_time: data.end_time,
                reservations: reservationsId
            });

            return { create_reservations, create_table, create_Time_Slot };
        },
        onSuccess: (data) => {
            console.log("All 3 tables populated successfully!", data);
        },
        onError: (error) => {
            console.error("Booking failed at some stage:", error);
        }
    });
    return {
        BookTable: createBookingMutation.mutate,
        isLoading: createBookingMutation.isPending, 
        isError: createBookingMutation.isError
    };
};