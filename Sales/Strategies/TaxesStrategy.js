class ImpuestosStrategy {
    calculateTax(product, taxRate) {
      throw new Error('This method must be implemented by subclasses');
    }
  }
  
  export default ImpuestosStrategy;