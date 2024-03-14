import TaxesStrategy from './TaxesStrategy';

class IVATaxStrategy extends TaxesStrategy {
  calculateTax(product) {
      const taxRate = 0.16
      return (product.precio_efectivo * taxRate * product.cantidad).toFixed(2);
    } 
  }


export default IVATaxStrategy;