from flask import Flask, jsonify
from src.service.ProductService import ProductService

app = Flask(__name__)

productService = ProductService()


@app.route('/product', methods=['GET'])
def get_all_products():
    return jsonify(productService.obtenerProducto())


if __name__ == '__main__':
    app.run(debug=True) 

