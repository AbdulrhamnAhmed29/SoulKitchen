import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { checkout } from "../services/CheckoutServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../cart/hook/useCart";
import { cartServices } from "../../cart/services/cartServices";

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const price = localStorage.getItem("productPrice");
    const userId = localStorage.getItem("userId");
    const { query } = useCart();
    const cartItems = query.data || [];


    const createOrderMutation = useMutation({
        mutationFn: async (data) => {
            // 1. checkout
            const checkoutRes = await checkout.createOrder({
                PayStatus: "pending",
                payment: data.payment,
                phone: data.phone,
                userName: data.userName,
                price: price,
                Address: data.Address
            });

            const checkoutId = checkoutRes?.documentId;


            // 2. order 
            const orderRes = await checkout.createMainOrder(
                {
                    totalPrice: price,
                    statusOrder: "pending",
                    users_permissions_user: userId,
                    checkout: checkoutId,
                }
            );
            const orderId = orderRes?.documentId;

            // 3. Order Items 
            const orderItemsPromises = cartItems.map((item) => {
                return checkout.createOrderItems(
                    {
                        product: item.product.documentId,
                        order: orderId,
                        price: item.price,
                        quantity: item.quantity
                    }
                );
            });


            await Promise.all(orderItemsPromises);


            return orderRes;
        },

        onSuccess: (response) => {

            queryClient.invalidateQueries({ queryKey: ["cart"] });

            toast.success("ORDER PLACED SUCCESSFULLY", {
                style: {
                    background: "#000",
                    color: "#fff",
                    borderRadius: "0px",
                    fontSize: "10px",
                    letterSpacing: "0.2em"
                }
            });
            if (cartItems && cartItems.length > 0) {
                cartItems.map((item) => {
                    return cartServices.deleteCartData(item.documentId)
                })
            }

            navigate("/Thank", {
                state: {
                    orderDetails: response?.data || response,

                }
            });

        },
        onError: (error) => {
            toast.error("PURCHASE FAILED. PLEASE TRY AGAIN.");
            console.error("Checkout Error:", error);
        },
    });




    return {
        createOrder: createOrderMutation.mutate,
        isCreating: createOrderMutation.isPending,

    };
};