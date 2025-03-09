from PIL import Image
import sys

def convert_to_webp(input_path, output_path):
    """
    Converte l'immagine in WebP mantenendo la massima qualità.
    """
    img = Image.open(input_path)
    img.save(output_path, 'WEBP', quality=100, lossless=True)
    print(f"Immagine convertita e salvata in: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python convert_to_webp.py <input_path> <output_path>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    convert_to_webp(input_path, output_path)
