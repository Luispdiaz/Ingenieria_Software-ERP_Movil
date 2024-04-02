import DiscountStrategy from './DiscountStrategy';

class PercentageDiscountStrategy extends DiscountStrategy {
  constructor(discountPercentage) {
    super();
    this.discountPercentage = discountPercentage;
  }

  calculateDiscountedPriceUSD(product) {
    return product.precio_usd * (1 - this.discountPercentage / 100);
  }

  calculateDiscountedPriceBolivares(product) {
    return product.precio_efectivo * (1 - this.discountPercentage / 100);
  }
}

export default PercentageDiscountStrategy;