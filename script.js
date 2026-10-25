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
        // 1. Doors Open
        overlay.classList.add('open');

        // 2. Small delay to see the miniature page through the door
        setTimeout(() => {
            // 3. Rushing Zoom
            wrapper.classList.add('zoom-in');
        }, 500);

        // 4. Music Delay (Starts after the rush is well underway)
        setTimeout(() => {
            music.play().catch(e => console.log("Audio blocked"));
        }, 1300);

        // 5. Fade in the audio controls only AFTER the zoom is finished
        setTimeout(() => {
            audioControls.style.opacity = '1';
        }, 1800);

        // 6. Remove black void
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

    // --- SCROLLSPY LOGIC ---
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

    // --- SLOW REVEAL ON SCROLL ---
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