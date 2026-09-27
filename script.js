/*!
 * © 2026 Yahya Alkharabsheh — All Rights Reserved.
 * Personal portfolio site. Unauthorized copying or redistribution of this
 * code is not permitted without consent.
 */
console.log('%c🛡 STOP', 'color:#ff7a3d; font-size:28px; font-weight:bold;');
console.log('%cThis is a browser feature intended for developers. If someone told you to paste something here, it is very likely a scam and could compromise your accounts.', 'color:#38bdf8; font-size:13px;');

document.addEventListener('contextmenu', function(e){ e.preventDefault(); });

document.addEventListener('DOMContentLoaded', () => {
  initTheme(); initNavigation(); initScrollEffects(); initMobileMenu(); initFormHandler(); initDownloadCv();
  setTimeout(initLoaderAnimation, 100);
});

function initDownloadCv(){
  ['downloadCvBtn','downloadCvBtn2','downloadCvBtn3'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.addEventListener('click', (e) => { e.preventDefault(); window.print(); });
  });
}

function initTheme(){
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', () => {
    const cur = document.body.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    btn.querySelector('i').className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

function initNavigation(){
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target){
        const headerH = document.querySelector('.main-header').offsetHeight + document.getElementById('classBar').offsetHeight;
        window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
      }
      if(document.getElementById('navMenu').classList.contains('active')) toggleMobileMenu();
    });
  });
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    header.classList.toggle('scrolled', window.scrollY > 40);
    const scrollPos = window.scrollY + 150;
    document.querySelectorAll('section[id]').forEach(sec => {
      if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight){
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === sec.id));
      }
    });
  });
}

function initScrollEffects(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        if(entry.target.classList.contains('about-stats')) animateStats();
        if(entry.target.id === 'skills') animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in, .section, #skills').forEach(el => observer.observe(el));
}

function animateStats(){
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count') || 0);
    let cur = 0;
    const step = Math.max(1, Math.round(target/30));
    const iv = setInterval(() => {
      cur += step;
      if(cur >= target){ cur = target; clearInterval(iv); }
      stat.textContent = cur;
    }, 35);
  });
}

function animateSkills(){
  document.querySelectorAll('.skill-item').forEach(item => {
    const percent = parseInt(item.getAttribute('data-percent') || 0);
    const bar = item.querySelector('.skill-progress');
    const label = item.querySelector('.skill-percent');
    let cur = 0;
    const iv = setInterval(() => {
      cur += 2;
      if(cur >= percent){ cur = percent; clearInterval(iv); }
      bar.style.width = cur + '%';
      label.textContent = cur + '%';
    }, 20);
  });
}

function initMobileMenu(){
  document.getElementById('menuToggle').addEventListener('click', toggleMobileMenu);
}
function toggleMobileMenu(){
  document.getElementById('navMenu').classList.toggle('active');
  document.getElementById('menuToggle').classList.toggle('active');
}

function initFormHandler(){
  var form = document.getElementById('contactForm');
  if(!form) return; // contact form was removed in favor of direct email/phone/WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message noted — please reach out directly via email for now: eng_yahya@live.com');
    e.target.reset();
  });
}

function initLoaderAnimation(){
  const loader = document.getElementById('loader');
  const pct = document.getElementById('loaderPercent');
  let progress = 0;
  const iv = setInterval(() => {
    progress += Math.random()*18;
    if(progress >= 100){
      progress = 100; clearInterval(iv);
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
    pct.textContent = Math.floor(progress) + '%';
  }, 100);
}
