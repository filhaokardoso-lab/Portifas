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