from bs4 import BeautifulSoup
import requests
import re

class ProductService:

    def obtenerProducto (self):
        url = 'https://listado.mercadolibre.com.pe/iphone-15'
        response = requests.get(url)
        identificador = 1

        soup = BeautifulSoup(response.content, 'html.parser')

        productList = []

        todos_products = soup.find_all('div', class_='ui-search-result__wrapper')

        for product_container in todos_products:

            if product_container:
                # Extrae el nombre del producto
                product_name = product_container.find('h3', class_='ui-search-item__title').text

                # Extrae el precio original
                original_price_element = product_container.find('s', class_='andes-money-amount')
                original_price = original_price_element.text if original_price_element else 'Precio no disponible'

                #Extraemos precio actual
                elemento_div = product_container.find('div', class_='ui-search-price__second-line')
                current_price_element = elemento_div.find('span', class_='andes-money-amount__fraction')
                current_price = current_price_element.text.replace('.','') if current_price_element else 'Precio no disponible'

                # Extrae la disponibilidad en colores
                color_availability_element = product_container.find('span', class_='ui-search-item__variations-text')
                color_availability = color_availability_element.text if color_availability_element else 'No has colores disponibles'

                # Extrae la calificación 
                rating_element = product_container.find('span', class_='ui-search-reviews__rating-number')
                rating = rating_element.text if rating_element else '0'

                # Extrae la imagen del producto
                image_url = product_container.find('img', class_='ui-search-result-image__element')['src']

                #cantidad de opiniones
                reviews_count_tag = product_container.find('span', class_='ui-search-reviews__amount')
                reviews_count_text = reviews_count_tag.text if reviews_count_tag else '0'
                reviews_count = re.search(r'\d+', reviews_count_text).group() if reviews_count_text else '0'

                producto = {
                    'id': identificador,
                    'name': product_name,
                    'original_price': original_price,
                    'current_price': float(current_price),
                    'availability-color': color_availability,
                    'img': image_url,
                    'rating': rating,
                    'review': reviews_count,

                } 
                identificador = identificador + 1 
                productList.append(producto)    

        return  productList