import { useAddToCart } from "@/services/cartMutations";

const AddProductButton: React.FC<any> = ({ product }) => {
  const { mutate: addToCart, isLoading } = useAddToCart() as any;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
    </button>
  );
};

export default AddProductButton;
