const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (prefersLight) {
  root.dataset.theme = 'light';
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Recognition gallery
const recognitionGalleryData = {
  'vc-medal': {
    type: 'Academic distinction',
    title: 'Vice Chancellor’s Silver Medal',
    subtitle: 'KIIT University',
    images: [
      { src: './assets/recognition/vc-medal.jpg', alt: 'Vice Chancellor’s Silver Medal recognition', caption: 'Vice Chancellor’s Silver Medal' }
    ]
  },
  'kiit-merit': {
    type: 'Academic distinction',
    title: 'KIIT Merit Scholarship',
    subtitle: 'Semesters 5–8',
    images: [
      { src: './assets/recognition/merit-sem-5.jpg', alt: 'KIIT Merit Scholarship recognition for semester 5', caption: 'Semester 5' },
      { src: './assets/recognition/merit-sem-6.jpg', alt: 'KIIT Merit Scholarship recognition for semester 6', caption: 'Semester 6' },
      { src: './assets/recognition/merit-sem-7.jpg', alt: 'KIIT Merit Scholarship recognition for semester 7', caption: 'Semester 7' },
      { src: './assets/recognition/merit-sem-8.jpg', alt: 'KIIT Merit Scholarship recognition for semester 8', caption: 'Semester 8' }
    ]
  },
  'precision-healthcare': {
    type: 'Finalist',
    title: 'Precision Healthcare Challenge',
    subtitle: 'Organized by GE Healthcare',
    images: [
      { src: './assets/recognition/precision-1.jpg', alt: 'Precision Healthcare Challenge recognition', caption: 'Challenge recognition' },
      { src: './assets/recognition/precision-2.jpg', alt: 'Precision Healthcare Challenge event image', caption: 'Challenge / event' }
    ]
  },
  'datadive': {
    type: 'Winner',
    title: 'DataDive',
    subtitle: 'Microsoft Learn Student Ambassadors, KIIT',
    images: [
      { src: './assets/recognition/datadive.jpg', alt: 'DataDive winner recognition', caption: 'Winner recognition' }
    ]
  },
  'devhack': {
    type: 'Finalist',
    title: 'DevHack Hackathon',
    subtitle: 'Google Developer Student Club, KIIT',
    images: [
      { src: './assets/recognition/devhack-1.jpg', alt: 'Rank 1 in Transport Domain of DevHack Hackathon', caption: 'Rank 1 · Transport Domain' },
      { src: './assets/recognition/devhack-2.jpg', alt: 'DevHack Hackathon achievement certificate', caption: 'Achievement certificate' }
    ]
  },
  'quarantine-hackfest': {
    type: 'Finalist',
    title: 'Quarantine Hackfest',
    subtitle: 'Microsoft Student Partners, KIIT',
    images: [
      { src: './assets/recognition/quarantine-1.jpg', alt: 'Quarantine Hackfest Top 11 Finalists recognition', caption: 'Top 11 finalists' },
      { src: './assets/recognition/quarantine-2.jpg', alt: 'Quarantine Hackfest certificate', caption: 'Certificate' }
    ]
  }
};

const recognitionModal = document.getElementById('recognitionModal');
const recognitionModalTitle = document.getElementById('recognitionModalTitle');
const recognitionModalKicker = document.getElementById('recognitionModalKicker');
const recognitionModalSubtitle = document.getElementById('recognitionModalSubtitle');
const recognitionGallery = document.getElementById('recognitionGallery');
const recognitionModalClose = document.getElementById('recognitionModalClose');
let recognitionLastTrigger = null;

function openRecognitionModal(key, trigger) {
  const item = recognitionGalleryData[key];
  if (!item || !recognitionModal) return;

  recognitionLastTrigger = trigger || null;
  recognitionModalKicker.textContent = item.type;
  recognitionModalTitle.textContent = item.title;
  recognitionModalSubtitle.textContent = item.subtitle;
  recognitionGallery.innerHTML = '';
  recognitionGallery.classList.toggle('single-image', item.images.length === 1);

  item.images.forEach((image) => {
    const figure = document.createElement('figure');
    figure.className = 'recognition-gallery-item';

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    img.decoding = 'async';

    figure.appendChild(img);
    if (image.caption) {
      const caption = document.createElement('figcaption');
      caption.textContent = image.caption;
      figure.appendChild(caption);
    }
    recognitionGallery.appendChild(figure);
  });

  recognitionModal.classList.add('is-open');
  recognitionModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('recognition-modal-open');
  recognitionModalClose.focus();
}

function closeRecognitionModal() {
  if (!recognitionModal || !recognitionModal.classList.contains('is-open')) return;
  recognitionModal.classList.remove('is-open');
  recognitionModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('recognition-modal-open');
  if (recognitionLastTrigger) recognitionLastTrigger.focus();
}

document.querySelectorAll('.recognition-card[data-recognition]').forEach((card) => {
  card.addEventListener('click', () => openRecognitionModal(card.dataset.recognition, card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openRecognitionModal(card.dataset.recognition, card);
    }
  });
});

recognitionModalClose?.addEventListener('click', closeRecognitionModal);
recognitionModal?.querySelector('.recognition-modal-backdrop')?.addEventListener('click', closeRecognitionModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeRecognitionModal();
});
