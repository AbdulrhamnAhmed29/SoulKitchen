import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartServices } from "../services/cartServices";

export const useCart = () => {
    const queryClient = useQueryClient();

    // Get cart products
    const query = useQuery({
        queryKey: ["cart"],
        queryFn: cartServices.getAllCart
    });
    const addMutation = useMutation({
        mutationFn: (item) => {
            const exist = query.data?.find(i => i.id === item.id);
            if (exist) {
                return cartServices.updateData(item.id, exist.quantity + 1);
            } else {
                return cartServices.create({ ...item, quantity: 1 });
            }
        },
        // ... onMutate, onError, onSettled
    });

    // Add item to cart with optimistic update
    const updateMutation = useMutation({
        mutationFn: (item) => cartServices.updateData(item.id, item.quantity || 1),
        onMutate: async (newItem) => {
            await queryClient.cancelQueries(["cart"]);

            const previousCart = queryClient.getQueryData(["cart"]);

            queryClient.setQueryData(["cart"], (old) => {
                const existItem = old.find(item => item.id === newItem.id);
                if (existItem) {
                    return old.map(item =>
                        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...old, { ...newItem, quantity: 1 }];
            });

            return { previousCart };
        },
        onError: (err, newItem, context) => {
            queryClient.setQueryData(["cart"], context.previousCart);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"]);
        }
    });

    // Remove item from cart
    const removeMutation = useMutation({
        mutationFn: (id) => cartServices.deleteCartData(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);
            queryClient.setQueryData(["cart"], (old) => old.filter(item => item.id !== id));
            return { previousCart };
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(["cart"], context.previousCart);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"]);
        }
    });

    return {
        // used in products page 
        addMutation,
        // used in cart page 
        query,
        updateMutation,
        removeMutation
    };
};