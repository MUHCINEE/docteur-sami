tailwind.config={theme:{extend:{colors:{cream:'#FBF8F2',sand:'#F1ECE1',forest:{50:'#E8F9F8',100:'#C2F3F0',300:'#7FE4E0',500:'#48D1CC',600:'#3BB3AF',700:'#2A8683',900:'#164846'},clay:'#C08552',ink:'#2B2A26',},fontFamily:{serif:['Fraunces','serif'],sans:['Manrope','sans-serif'],arabic:['Noto Naskh Arabic','serif'],},}}}
document.addEventListener('DOMContentLoaded',function(){if(typeof lucide!=='undefined'){lucide.createIcons()}
const mobileMenuBtn=document.getElementById('mobileMenuBtn');const mobileMenu=document.getElementById('mobileMenu');if(mobileMenuBtn&&mobileMenu){function setMenuOpen(isOpen){mobileMenu.classList.toggle('open',isOpen);mobileMenuBtn.setAttribute('aria-expanded',String(isOpen))}
mobileMenuBtn.setAttribute('aria-expanded','false');mobileMenuBtn.setAttribute('aria-controls','mobileMenu');mobileMenuBtn.addEventListener('click',function(e){e.stopPropagation();setMenuOpen(!mobileMenu.classList.contains('open'))});const mobileLinks=mobileMenu.querySelectorAll('a');mobileLinks.forEach(function(link){link.addEventListener('click',function(){setMenuOpen(!1)})});document.addEventListener('click',function(e){if(!mobileMenu.contains(e.target)&&!mobileMenuBtn.contains(e.target)){setMenuOpen(!1)}});window.addEventListener('resize',function(){if(window.innerWidth>=1024){setMenuOpen(!1)}})}
initRdvForm()});function initRdvForm(){const form=document.getElementById('rdv-form');if(!form)return;const dateInput=document.getElementById('rdv-date');if(dateInput&&typeof flatpickr!=='undefined'){const fp=flatpickr(dateInput,{locale:'fr',dateFormat:'d/m/Y',minDate:'today',disableMobile:!0,animate:!0});const trigger=document.getElementById('calendar-trigger');if(trigger){trigger.addEventListener('click',function(){fp.open()})}}
form.addEventListener('submit',function(event){event.preventDefault();const nomEl=document.getElementById('rdv-nom');const telEl=document.getElementById('rdv-tel');const motifEl=document.getElementById('rdv-motif');const dateEl=document.getElementById('rdv-date');if(!nomEl||!telEl||!motifEl||!dateEl)return;const message='Bonjour Dr.Sami Khettab, je souhaite prendre rendez-vous.\n'+'Nom : '+nomEl.value+'\n'+'Téléphone : '+telEl.value+'\n'+'Motif : '+motifEl.value+'\n'+'Créneau souhaité : '+dateEl.value;const url='https://wa.me/212650671855?text='+encodeURIComponent(message);window.open(url,'_blank')})}

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  document.querySelectorAll("#cabinet figure").forEach((figure) => {
    figure.addEventListener("click", () => {
      const img = figure.querySelector("img");
      const caption = figure.querySelector("figcaption");

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : "";
        lightbox.classList.remove("hidden");
      }
    });
  });

  const closeLightbox = () => lightbox.classList.add("hidden");

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });
});

