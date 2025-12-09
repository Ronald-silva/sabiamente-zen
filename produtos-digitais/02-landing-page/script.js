/* ========================================
   SABIAMENTE ZEN - LANDING PAGE SCRIPT
   Interatividade e Funcionalidades
======================================== */

// ========================================
// COUNTDOWN TIMER
// ========================================
function initCountdown() {
    // Define data final (24 horas a partir de agora)
    // Você pode alterar para uma data fixa se preferir
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 24);

    // Ou use uma data fixa:
    // const countdownDate = new Date("2025-12-31 23:59:59").getTime();

    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Cálculos de tempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Adiciona zero à esquerda se necessário
        const formatTime = (time) => time < 10 ? `0${time}` : time;

        // Atualiza elementos do DOM
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = formatTime(days);
        if (hoursEl) hoursEl.textContent = formatTime(hours);
        if (minutesEl) minutesEl.textContent = formatTime(minutes);
        if (secondsEl) secondsEl.textContent = formatTime(seconds);

        // Se o countdown terminar
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minutesEl) minutesEl.textContent = "00";
            if (secondsEl) secondsEl.textContent = "00";

            // Opcional: exibir mensagem ou esconder seção de urgência
            const urgenciaSection = document.querySelector('.urgencia-warning');
            if (urgenciaSection) {
                urgenciaSection.innerHTML = '<strong>Oferta expirada!</strong> Entre em contato para novas oportunidades.';
            }
        }
    }, 1000);
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle classe active no item clicado
            const isActive = item.classList.contains('active');

            // Fecha todos os itens
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Abre o item clicado (se não estava aberto)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignora links vazios ou apenas #
            if (href === '#' || !href) return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Scroll suave para o elemento
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Atualiza URL sem scroll
                history.pushState(null, null, href);
            }
        });
    });
}

// ========================================
// SCROLL REVEAL (Animação ao aparecer)
// ========================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const elements = document.querySelectorAll('.feature, .depoimento, .produto, .bonus-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Adiciona classe CSS quando elemento aparece
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// ANALYTICS TRACKING (Opcional)
// ========================================
function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', action, { category, label });
    }

    // Console log para debug
    console.log('Event tracked:', category, action, label);
}

// ========================================
// TRACKING DE CTAs
// ========================================
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn-primary');

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = btn.textContent.trim();
            const section = btn.closest('section')?.id || 'unknown';

            trackEvent('CTA Click', 'Button Click', `${section}: ${buttonText}`);
        });
    });
}

// ========================================
// SCROLL PROGRESS BAR (Opcional)
// ========================================
function initScrollProgress() {
    // Cria barra de progresso
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #1A5490, #27AE60);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    // Atualiza width ao fazer scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = progress + '%';
    });
}

// ========================================
// MODAL DE SAÍDA (Exit Intent) - Opcional
// ========================================
function initExitIntent() {
    let modalShown = false;

    document.addEventListener('mouseleave', (e) => {
        // Se mouse sai pelo topo da página
        if (e.clientY <= 0 && !modalShown) {
            modalShown = true;
            showExitModal();
        }
    });

    function showExitModal() {
        // Verifica se modal já foi fechado antes (localStorage)
        if (localStorage.getItem('exitModalShown')) {
            return;
        }

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                text-align: center;
                position: relative;
            ">
                <button id="closeModal" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #333;
                ">&times;</button>

                <h2 style="color: #1A5490; margin-bottom: 1rem;">
                    ⚠️ Espere! Não Vá Ainda...
                </h2>

                <p style="margin-bottom: 1.5rem; font-size: 1.125rem;">
                    Você está a <strong>um clique</strong> de transformar sua ansiedade.
                </p>

                <p style="margin-bottom: 1.5rem; color: #E74C3C; font-weight: 700;">
                    BÔNUS ESPECIAL: Use o cupom <span style="font-size: 1.5rem;">FICOUFALTA10</span>
                    para <strong>R$ 10 de desconto extra!</strong>
                </p>

                <a href="#oferta" style="
                    display: inline-block;
                    background: #27AE60;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                ">
                    APROVEITAR DESCONTO EXTRA
                </a>

                <p style="font-size: 0.875rem; color: #666; margin-top: 1rem;">
                    Apenas hoje. Não perca!
                </p>
            </div>
        `;

        document.body.appendChild(modal);

        // Adiciona animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Fecha modal
        const closeBtn = modal.querySelector('#closeModal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            localStorage.setItem('exitModalShown', 'true');
        });

        // Fecha ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                localStorage.setItem('exitModalShown', 'true');
            }
        });

        // Track evento
        trackEvent('Exit Intent', 'Modal Shown', 'Exit Intent Modal');
    }
}

// ========================================
// SCROLL TO TOP BUTTON (Opcional)
// ========================================
function initScrollToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1A5490;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        trackEvent('Navigation', 'Scroll to Top', 'Button Click');
    });

    document.body.appendChild(button);

    // Mostra/esconde baseado em scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.background = '#2E75B5';
        button.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = '#1A5490';
        button.style.transform = 'translateY(0)';
    });
}

// ========================================
// LAZY LOADING IMAGES (Opcional)
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// FORM VALIDATION (Para quando adicionar form)
// ========================================
function initFormValidation() {
    const form = document.querySelector('#checkout-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validações básicas
            const email = form.querySelector('input[type="email"]');
            const nome = form.querySelector('input[name="nome"]');

            if (!email.value || !email.value.includes('@')) {
                alert('Por favor, insira um email válido.');
                email.focus();
                return false;
            }

            if (!nome.value || nome.value.length < 3) {
                alert('Por favor, insira seu nome completo.');
                nome.focus();
                return false;
            }

            // Se validou, prossegue (aqui você integraria com gateway)
            trackEvent('Checkout', 'Form Submit', 'Validation Passed');
            console.log('Form válido, processando...');

            // Aqui você chamaria a API do Stripe/Hotmart
            // processPayment(formData);
        });
    }
}

// ========================================
// INIT ALL ON DOM LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sabiamente Zen - Landing Page carregada!');

    // Inicializa funções principais
    initCountdown();
    initFAQ();
    initSmoothScroll();
    initScrollReveal();
    initCTATracking();

    // Funções opcionais (descomente para ativar)
    initScrollProgress();
    // initExitIntent(); // Descomente se quiser modal de saída
    initScrollToTop();
    // initLazyLoading(); // Descomente se usar lazy loading
    // initFormValidation(); // Descomente quando adicionar form real

    // Tracking de page view
    trackEvent('Page View', 'Landing Page', 'Sistema Completo');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Scrollspy (marca seção ativa no menu)
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Detecta dispositivo mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Copia texto para clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado:', text);
        // Opcional: mostrar toast notification
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// Debug mode (ativa com ?debug=true na URL)
if (window.location.search.includes('debug=true')) {
    console.log('Debug mode ativo!');

    // Adiciona bordas visuais às seções
    document.querySelectorAll('section').forEach(section => {
        section.style.outline = '2px solid red';
    });

    // Log de eventos
    document.addEventListener('click', (e) => {
        console.log('Click em:', e.target);
    });
}

/* ========================================
   INTEGRAÇÃO COM ANALYTICS
======================================== */

// Google Analytics 4 (exemplo)
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'G-XXXXXXXXXX');

// Facebook Pixel (exemplo)
// !function(f,b,e,v,n,t,s)
// {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
// n.callMethod.apply(n,arguments):n.queue.push(arguments)};
// if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
// n.queue=[];t=b.createElement(e);t.async=!0;
// t.src=v;s=b.getElementsByTagName(e)[0];
// s.parentNode.insertBefore(t,s)}(window, document,'script',
// 'https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', 'YOUR_PIXEL_ID');
// fbq('track', 'PageView');

/* ========================================
   HOTMART/STRIPE INTEGRATION PLACEHOLDER
======================================== */

// Exemplo de integração Hotmart
// function loadHotmartCheckout() {
//     const script = document.createElement('script');
//     script.src = 'https://pay.hotmart.com/assets/js/hotmart.min.js';
//     document.head.appendChild(script);
//
//     script.onload = () => {
//         new HotmartCheckout({
//             productId: 'SEU_PRODUCT_ID',
//             offerId: 'SEU_OFFER_ID',
//             checkoutUrl: 'https://pay.hotmart.com/...'
//         });
//     };
// }

// Exemplo de integração Stripe
// function loadStripeCheckout() {
//     const stripe = Stripe('pk_live_...');
//
//     const checkoutButton = document.querySelector('.btn-checkout');
//     checkoutButton.addEventListener('click', async () => {
//         const { error } = await stripe.redirectToCheckout({
//             lineItems: [{price: 'price_...', quantity: 1}],
//             mode: 'payment',
//             successUrl: 'https://sabiamente.com.br/sucesso',
//             cancelUrl: 'https://sabiamente.com.br/sistema-completo',
//         });
//
//         if (error) {
//             console.error(error);
//         }
//     });
// }

console.log('Script carregado com sucesso! 🚀');
