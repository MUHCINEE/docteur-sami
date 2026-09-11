// Configuration du thème Tailwind (couleurs et polices du cabinet)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        cream: '#FBF8F2',
        sand:  '#F1ECE1',
        forest: { 
          50:  '#E8F9F8', 
          100: '#C2F3F0', 
          300: '#7FE4E0',
          500: '#48D1CC',
          600: '#3BB3AF',
          700: '#2A8683', 
          900: '#164846'  
        },
        clay:  '#C08552',
        ink:   '#2B2A26',
      },
      fontFamily: {
        serif: ['Fraunces','serif'],
        sans:  ['Manrope','sans-serif'],
        arabic:['Noto Naskh Arabic','serif'],
      },
    }
  }
}
// Function pour le formulaire WhatsApp
document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Initialiser les icônes Lucide (إن وجدت)
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Gestion du Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    // سد الموني عند الضغط على أي رابط
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
      });
    });

    // سد الموني إلا كليكا المستخدم فشي بلاصة خاوية فـ الصفحة
    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // 3. Formulaire WhatsApp (إذا كان موجوداً في الصفحة)
  initRdvForm();
});

function initRdvForm() {
  const form = document.getElementById('rdv-form');
  if (!form) return; // إلا مالقاش الفورم مايدير والو ومايعطيش Error

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nomEl = document.getElementById('rdv-nom');
    const telEl = document.getElementById('rdv-tel');
    const motifEl = document.getElementById('rdv-motif');
    const dateEl = document.getElementById('rdv-date');

    if (!nomEl || !telEl || !motifEl || !dateEl) return;

    const message =
      'Bonjour Dr.Sami Khettab, je souhaite prendre rendez-vous.\n' +
      'Nom : ' + nomEl.value + '\n' +
      'Téléphone : ' + telEl.value + '\n' +
      'Motif : ' + motifEl.value + '\n' +
      'Créneau souhaité : ' + dateEl.value;

    const url = 'https://wa.me/212650671855?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  });
}