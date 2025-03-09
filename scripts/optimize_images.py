from PIL import Image
import os
import sys

def optimize_image(input_path, output_path, max_size=1500):
    """
    Ottimizza un'immagine ridimensionandola e convertendola in formato WebP.
    
    Args:
        input_path (str): Percorso dell'immagine di input
        output_path (str): Percorso dove salvare l'immagine ottimizzata
        max_size (int): Dimensione massima per larghezza o altezza
    
    Returns:
        tuple: Nuove dimensioni dell'immagine (width, height)
    """
    print(f"Ottimizzazione di: {input_path}")
    print(f"Output in: {output_path}")
    
    # Crea la directory di output se non esiste
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Apri l'immagine
    img = Image.open(input_path)
    
    # Converti in RGB se necessario
    if img.mode in ('RGBA', 'LA'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Calcola le nuove dimensioni mantenendo l'aspect ratio
    ratio = min(max_size/max(img.size[0], img.size[1]), 1.0)
    new_size = tuple([int(x*ratio) for x in img.size])
    
    print(f"Dimensioni originali: {img.size}")
    print(f"Nuove dimensioni: {new_size}")
    
    # Ridimensiona l'immagine usando LANCZOS per la migliore qualità
    img = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # Salva come WebP con alta qualità
    img.save(output_path, 'WEBP', quality=90, method=6)
    
    print(f"Immagine ottimizzata salvata in: {output_path}")
    print(f"Nuove dimensioni: {new_size}")
    
    return new_size

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python optimize_images.py <input_path> <output_path>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    try:
        new_size = optimize_image(input_path, output_path, max_size=2000)
        print("Ottimizzazione completata con successo!")
    except Exception as e:
        print(f"Errore durante l'ottimizzazione: {str(e)}")
