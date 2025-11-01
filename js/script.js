document.addEventListener('DOMContentLoaded', () => {
    setupButtonHoverEffects();
    setupScrollReveal();
    setupAutoGridToggle();
    setupCarSelection(); 
    setupCatalogoNavLink();
});

// Hover buttons
function setupButtonHoverEffects() {
    const buttons = document.querySelectorAll('.button-outline, .button-solid , .button-wrappe');
    
    buttons.forEach(button => {
        button.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

// Scroll reveal
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const checkVisibility = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            el.classList.toggle('active', elementTop < windowHeight - revealPoint);
        });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    checkVisibility();
}

// Toggle grid autos
function setupAutoGridToggle() {
    const toggleButtons = document.querySelectorAll('[data-target]');
    toggleButtons.forEach(btn => {
        const targetId = btn.dataset.target;
        const targetGrid = document.getElementById(targetId);

        if (!targetGrid) return;

        targetGrid.classList.add('hidden-on-load');
        btn.textContent = 'Mostrar Autos';
        btn.setAttribute('aria-expanded', 'false');

        btn.addEventListener('click', () => {
            const willShow = targetGrid.classList.contains('hidden-on-load');
            targetGrid.classList.toggle('hidden-on-load');
            btn.textContent = willShow ? 'Ocultar Autos' : 'Mostrar Autos';
            btn.setAttribute('aria-expanded', willShow.toString());

            if (willShow) {
                setTimeout(() => {
                    targetGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 50);
            }
        });
    });
}



function setupCarSelection() {
  const cards = document.querySelectorAll('#autos-catalogo-grid .card, #autos-sostenibles-grid .card');

  cards.forEach(card => {
    const btn = card.querySelector('button.button-solid');

    btn?.addEventListener('click', () => {
      const title = card.querySelector('.card-front h3')?.innerText.trim();
      const img = card.querySelector('.card-front img')?.getAttribute('src');
      const priceDiv = card.querySelector('.card-front .price p');
      const priceText = priceDiv ? priceDiv.innerText.trim() : null; 

      console.log('title:', title);
      console.log('img:', img);
      console.log('priceText:', priceText);

      if (!title || !img || !priceText) {
        alert('Error al seleccionar el auto. Intenta de nuevo.');
        return;
      }

      // Limpiar precio y parsear a número
      const rawNumber = priceText.replace(/[^\d,\.]/g, '').replace(',', '.');
      const precio = parseFloat(rawNumber);

      if (isNaN(precio)) {
        alert('Error al interpretar el precio. Intenta de nuevo.');
        return;
      }

      const data = { nombre: title, imagen: img, precio };
      localStorage.setItem('carroSeleccionado', JSON.stringify(data));
      window.location.href = 'booking.html';
    });
  });
}

