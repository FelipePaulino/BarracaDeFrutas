import { useUpdateQuantity } from "@/services/cartMutations";

const QuantityInput: React.FC<any> = ({ productId, currentQuantity }) => {
  const { mutate: updateQuantity, isLoading } = useUpdateQuantity() as any;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(event.target.value);
    if (newQuantity > 0) {
      updateQuantity({ id: productId, quantidade: newQuantity });
    }
  };

  return (
    <input
      type="number"
      value={currentQuantity}
      onChange={handleQuantityChange}
      disabled={isLoading}
    />
  );
};

export default QuantityInput;
