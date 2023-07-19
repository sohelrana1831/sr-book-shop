import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const handleAddProduct = (product: IProduct) => {
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <div>
          <Link to={`/product-details/${product._id}`} className="w-full">
            <img src={product?.image} alt="product" />
            <h1 className="text-xl items-center font-semibold">
              {product?.name}
            </h1>
          </Link>
        </div>
        <div className="flex  justify-between gap-8">
          <p>Rating: {product?.rating} </p>
          <p className="text-sm">
            {product?.status ? 'In stock' : 'Out of stock'}
          </p>
          <p className="text-lg">
            {product?.price} <span className="text-lg">&#2547;</span>
          </p>
        </div>
        <Button variant="default" onClick={() => handleAddProduct(product)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
