import TaxesStrategy from './TaxesStrategy';

class FreeTaxStrategy extends TaxesStrategy {
  calculateTax(product) {
      const taxRate = 0
      return (product.precio_efectivo * taxRate * product.cantidad).toFixed(2);
    } 
  }


export default FreeTaxStrategy;