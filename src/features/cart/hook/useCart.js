import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartServices } from "../services/cartServices";

export const useCart = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["cart"],
        queryFn: cartServices.getAllCart
    });


    const addMutation = useMutation({
        mutationFn: (item) => {
            const exist = query.data?.find(i => (i.product?.documentId === item.documentId));
            const userId = localStorage.getItem("userId")

            if (exist) {
                console.log("INCREMENT PRODUCT");
                return cartServices.updateData(
                    exist.documentId,
                    exist.quantity + 1 
                );

            } else {
                console.log("ADDED NEW PRODUCT");
                console.log(item);

                return cartServices.create({
                    product: item.documentId,
                    quantity: 1,
                    users_permissions_user: userId
                });
            }
        },
        onSuccess: () => queryClient.invalidateQueries(["cart"])
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, quantity }) => cartServices.updateData(id, quantity),
        onMutate: async (newItem) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            queryClient.setQueryData(["cart"], (old) => {
                return old?.map(item =>
                    item.documentId === newItem.id
                        ? { ...item, quantity: newItem.quantity }
                        : item
                );
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

    const removeMutation = useMutation({
        mutationFn: (id) => cartServices.deleteCartData(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            queryClient.setQueryData(["cart"], (old) =>
                old?.filter(item => item.documentId !== id)
            );

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
        addMutation: addMutation.mutate,
        query,
        updateMutation: updateMutation.mutate,
        removeMutation: removeMutation
    };
};