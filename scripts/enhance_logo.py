from PIL import Image, ImageEnhance, ImageOps
import numpy as np

def enhance_logo(input_path, output_path):
    """
    Migliora la qualità del logo con varie tecniche di image processing.
    """
    print(f"Elaborazione del logo: {input_path}")
    
    # Carica l'immagine
    img = Image.open(input_path)
    
    # Converti in RGBA se necessario
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Converti in array numpy per manipolazione avanzata
    img_array = np.array(img)
    
    # Separa i canali
    r, g, b, a = img_array.T
    
    # Identifica i pixel bianchi o quasi bianchi (più preciso)
    white_areas = (r > 240) & (g > 240) & (b > 240)
    
    # Rendi completamente trasparenti i pixel bianchi
    img_array[..., 3] = np.where(white_areas.T, 0, 255)
    
    # Riconverti in immagine PIL
    enhanced_img = Image.fromarray(img_array)
    
    # Aumenta il contrasto
    enhancer = ImageEnhance.Contrast(enhanced_img)
    enhanced_img = enhancer.enhance(1.2)
    
    # Aumenta la nitidezza
    enhancer = ImageEnhance.Sharpness(enhanced_img)
    enhanced_img = enhancer.enhance(1.3)
    
    # Regola la luminosità
    enhancer = ImageEnhance.Brightness(enhanced_img)
    enhanced_img = enhancer.enhance(0.95)
    
    # Salva il risultato
    enhanced_img.save(output_path, 'PNG', optimize=True)
    print(f"Logo migliorato salvato in: {output_path}")
    
    # Crea anche una versione WebP
    webp_path = output_path.replace('.png', '.webp')
    enhanced_img.save(webp_path, 'WEBP', quality=90, lossless=True)
    print(f"Versione WebP salvata in: {webp_path}")

if __name__ == "__main__":
    input_path = "/Users/alessiocavatassi/CascadeProjects/aurea-group/public/images/logo-iosi.png"
    output_path = "/Users/alessiocavatassi/CascadeProjects/aurea-group/public/images/logo-iosi-enhanced.png"
    enhance_logo(input_path, output_path)
