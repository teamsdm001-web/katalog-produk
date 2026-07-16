import { Product } from '../types';
import { acneProducts } from './acneProducts';
import { dermaProducts } from './dermaProducts';
import { skincareProducts } from './skincareProducts';
import { enrichProduct } from '../utils/productEnricher';

// Merge all products from separate categories and enrich them
export const products: Product[] = [
  ...acneProducts,
  ...dermaProducts,
  ...skincareProducts
].map(enrichProduct);
