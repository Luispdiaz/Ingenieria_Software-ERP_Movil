import DiscountStrategy from './DiscountStrategy';

class FixedDiscountStrategy extends DiscountStrategy {
  constructor(discountAmount) {
    super();
    this.discountAmount = discountAmount;
  }

  calculateDiscountedPrice(product) {
    return Math.max(0, product.price - this.discountAmount);
  }
}

export default FixedDiscountStrategy;