from flask import Flask, jsonify
from src.service.ProductService import ProductService

app = Flask(__name__)

productService = ProductService()


@app.route('/product', methods=['GET'])
def get_all_products():
    return jsonify(productService.obtenerProducto())

@app.route('/product/id/<int:id>', methods=['GET'])
def get_product(id):
    productos = productService.obtenerProducto()
    
    for producto in productos:
        if producto["id"] == id:
            return jsonify(producto)
    return jsonify({"message": "Producto no encontrado"}), 404

@app.route('/product/price/<int:price>', methods=['GET'])
def get_products_price(price):
    productos = productService.obtenerProducto()
    new_productos = [producto for producto in productos if producto["current_price"] > price]

    if new_productos :
        return jsonify(new_productos)
    else:
        return jsonify({"message": "Producto no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True) 

