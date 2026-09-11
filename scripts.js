const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => revealObserver.observe(item));
}

const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
}

const aboutSection = document.querySelector('.about-section');
const aboutCube = document.querySelector('.cube');
if (aboutSection && aboutCube && !reducedMotion) {
    let cubeScrollFrame;

    const rotateCubeWithScroll = () => {
        const sectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
        const rotation = (window.scrollY - sectionTop) * 0.22;
        aboutCube.style.transform = `rotateX(-18deg) rotateY(${rotation - 28}deg) rotateZ(${rotation + 6}deg)`;
        cubeScrollFrame = undefined;
    };

    window.addEventListener('scroll', () => {
        if (cubeScrollFrame !== undefined) return;
        cubeScrollFrame = window.requestAnimationFrame(rotateCubeWithScroll);
    }, { passive: true });

    rotateCubeWithScroll();
}
function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.add('hidden'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) target.classList.remove('hidden');
        const activeBtn = Array.from(document.querySelectorAll('.tab-button')).find(btn => btn.getAttribute('onclick').includes(sectionId));
        if (activeBtn) activeBtn.classList.add('active');
    }
    document.addEventListener('DOMContentLoaded', () => showSection('formacao'));

(function () { function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'9815997fc401f1df',t:'MTc1ODI0ODM4MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } } if (document.body) { var a = document.createElement('iframe'); a.height = 1; a.width = 1; a.style.position = 'absolute'; a.style.top = 0; a.style.left = 0; a.style.border = 'none'; a.style.visibility = 'hidden'; document.body.appendChild(a); if ('loading' !== document.readyState) c(); else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c); else { var e = document.onreadystatechange || function () { }; document.onreadystatechange = function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) } } } })();