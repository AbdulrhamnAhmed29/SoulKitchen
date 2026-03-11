import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { orderServices } from "../services/orderServices"

export const useMyorder = (onSuccessCallback, onErrorCallback) => {
    const queryClient = useQueryClient();

    // 1. show orders
    const ShowMyOrders = useQuery({
        queryKey: ['myorder'],
        queryFn: orderServices.findAll,
        select: (data) => {
            const rawOrders = data.orders || [];
            const uniqueOrders = Array.from(
                new Map(rawOrders.map(order => [order.documentId, order])).values()
            );
            return uniqueOrders
        }
    });


    // 1. show order items 
    const ShowMyOrdersItems = useQuery({
        queryKey: ['ordersitems'],
        queryFn: orderServices.findAllItems,
    });

  

    // 2. delete orders
    const deleteMutation = useMutation({
        mutationFn: (id) => orderServices.deleteOrder(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['myorder'] });
        },
        onError: (err) => {
            if (onErrorCallback) onErrorCallback(err);
        }
    });


    return {
        // show data 
        myOrder: ShowMyOrders.data || [],
        isLoading: ShowMyOrders.isLoading,
        isError: ShowMyOrders.isError,
        // delet data 
        deleteOrder: deleteMutation.mutate,
        isDeleting: deleteMutation.isLoading,
        //  ShowMyOrdersItems 
        ShowMyOrdersItems: ShowMyOrdersItems.data,



    }
}