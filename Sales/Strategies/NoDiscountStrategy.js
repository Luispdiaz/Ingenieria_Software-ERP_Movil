import DiscountStrategy from './DiscountStrategy';

class NoDiscountStrategy extends DiscountStrategy {
  calculateDiscountedPriceUSD(product) {
    return product.precio_usd;
  }

  calculateDiscountedPriceBolivares(product) {
    return product.precio_efectivo;
  }
}

export default NoDiscountStrategy;