document.addEventListener('DOMContentLoaded', () => {
    const doorL = document.getElementById('door-l');
    const doorR = document.getElementById('door-r');
    const overlay = document.getElementById('entrance-overlay');
    const wrapper = document.querySelector('.main-wrapper');
    const audioControls = document.getElementById('audio-controls');
    const music = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause');
    const volumeSlider = document.getElementById('volume-slider');
    const navLinks = document.querySelectorAll('.nav-link');

    const openCafe = () => {

        overlay.classList.add('open');


        setTimeout(() => {

            wrapper.classList.add('zoom-in');
        }, 500);


        setTimeout(() => {
            music.play().catch(e => console.log("Audio blocked"));
        }, 1300);


        setTimeout(() => {
            audioControls.style.opacity = '1';
        }, 1800);


        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1200);
        }, 1200);
    };

    doorL.addEventListener('click', openCafe);
    doorR.addEventListener('click', openCafe);

    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playPauseBtn.innerText = '⏸';
        } else {
            music.pause();
            playPauseBtn.innerText = '▶';
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });


    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('section, header').forEach(section => {
        sectionObserver.observe(section);
    });


    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
