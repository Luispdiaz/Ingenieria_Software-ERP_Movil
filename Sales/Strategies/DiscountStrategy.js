class DiscountStrategy {
    calculateDiscountedPrice(product) {
      throw new Error('This method must be implemented by subclasses');
    }
  }
  
  export default DiscountStrategy;