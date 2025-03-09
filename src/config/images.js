// Configurazione delle immagini del sito
export const images = {
  // Hero Section
  hero: {
    background: '/images/hero-bg.webp',
    logo: '/images/logo.webp',
  },
  
  // About Section
  about: {
    team: '/images/team.webp',
    office: '/images/office.webp',
  },
  
  // Work Section
  work: {
    projects: [
      '/images/project1.webp',
      '/images/project2.webp',
      '/images/project3.webp',
    ],
  },
  
  // Clients Section
  clients: {
    logos: [
      '/images/client1.webp',
      '/images/client2.webp',
      '/images/client3.webp',
    ],
  },
};

// Funzione helper per ottenere il percorso completo dell'immagine
export const getImagePath = (path) => {
  // In development, usa il percorso relativo
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // In production, aggiungi il base path se necessario
  return `${process.env.PUBLIC_URL || ''}${path}`;
};

// Funzione per precaricare le immagini critiche
export const preloadCriticalImages = () => {
  const criticalImages = [
    images.hero.background,
    images.hero.logo,
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = getImagePath(src);
  });
};
