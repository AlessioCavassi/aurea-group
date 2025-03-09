from PIL import Image, ImageEnhance
import os

def enhance_image(input_path, output_path):
    # Apri l'immagine
    img = Image.open(input_path)
    
    # Converti in RGBA se non lo è già
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Migliora il contrasto
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)  # Aumenta leggermente il contrasto
    
    # Migliora la nitidezza
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.3)  # Aumenta la nitidezza
    
    # Migliora la luminosità
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.1)  # Aumenta leggermente la luminosità
    
    # Assicurati che la cartella di output esista
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Salva l'immagine in formato WebP con alta qualità
    img.save(output_path, 'WEBP', quality=95, lossless=True)

if __name__ == "__main__":
    # Percorsi delle immagini
    input_path = "/Users/alessiocavatassi/CascadeProjects/aurea-group/src/assets/images/iosi-logo-bianco.png"
    output_path = "/Users/alessiocavatassi/CascadeProjects/aurea-group/public/images/logo-iosi.webp"
    
    # Migliora l'immagine
    enhance_image(input_path, output_path)
    print(f"Immagine migliorata salvata in: {output_path}")
