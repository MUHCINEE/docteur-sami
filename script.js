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

// Envoi du formulaire de rendez-vous vers WhatsApp
function initRdvForm() {
  const form = document.getElementById('rdv-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nom = document.getElementById('rdv-nom').value;
    const tel = document.getElementById('rdv-tel').value;
    const motif = document.getElementById('rdv-motif').value;
    const date = document.getElementById('rdv-date').value;

    const message =
      'Bonjour Dr. Khettab, je souhaite prendre rendez-vous.\n' +
      'Nom: ' + nom + '\n' +
      'Téléphone: ' + tel + '\n' +
      'Motif: ' + motif + '\n' +
      'Créneau souhaité: ' + date;

    const url = 'https://wa.me/212650671855?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();
  initRdvForm();
});

