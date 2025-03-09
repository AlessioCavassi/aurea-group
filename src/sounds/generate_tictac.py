import numpy as np
from scipy.io import wavfile
from scipy import signal
import os

def generate_soft_sound(duration, base_freq, resonance_freq, sample_rate):
    """Genera un singolo suono delicato"""
    samples = int(duration * sample_rate)
    t = np.linspace(0, duration, samples)
    
    # Suono base
    sound = np.sin(2 * np.pi * base_freq * t) * 0.3
    
    # Risonanza più chiara
    resonance = np.sin(2 * np.pi * resonance_freq * t) * 0.1
    sound += resonance
    
    # Inviluppo molto graduale
    envelope = np.exp(-12 * t) * np.sin(np.pi * t / duration)**2
    sound = sound * envelope
    
    # Filtro passa-banda per un suono più chiaro
    sos = signal.butter(2, [300, 1200], 'bandpass', fs=sample_rate, output='sos')
    sound = signal.sosfilt(sos, sound)
    
    return sound

def generate_tick_tock(duration=1.0, sample_rate=44100):
    samples = int(sample_rate * duration)
    sound = np.zeros(samples)
    
    # Genera il "tic" (più acuto e leggero)
    tic = generate_soft_sound(0.15, 400, 800, sample_rate)
    
    # Genera il "tac" (leggermente più grave ma sempre chiaro)
    tac = generate_soft_sound(0.15, 300, 600, sample_rate)
    
    # Posiziona i suoni
    tic_start = int(samples * 0.3)  # Tic al 30% della durata
    tac_start = int(samples * 0.7)  # Tac al 70% della durata
    
    # Aggiungi i suoni
    sound[tic_start:tic_start + len(tic)] = tic * 0.9  # Tic leggermente più forte
    sound[tac_start:tac_start + len(tac)] = tac * 0.7  # Tac un po' più soft
    
    # Normalizza delicatamente
    sound = sound / np.max(np.abs(sound)) * 0.6
    sound = np.int16(sound * 32767)
    
    return sample_rate, sound

# Genera e salva il suono
sample_rate, sound = generate_tick_tock()

# Crea la directory di output se non esiste
output_dir = os.path.join(os.path.dirname(__file__), '../../public/sounds')
os.makedirs(output_dir, exist_ok=True)

# Salva il file
output_file = os.path.join(output_dir, 'tick-tock.wav')
wavfile.write(output_file, sample_rate, sound)
print(f"File audio creato con successo: {output_file}")
