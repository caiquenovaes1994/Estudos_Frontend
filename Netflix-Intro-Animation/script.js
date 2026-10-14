// Audio synthesizer for Netflix "Ta-Dum" cinematic sound
function playTudumSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const now = ctx.currentTime;

        // Sub bass / heavy thud 1
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(120, now);
        osc1.frequency.exponentialRampToValueAtTime(35, now + 0.35);
        gain1.gain.setValueAtTime(1, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 1.2);

        // Sub bass / heavy thud 2 (delayed second impact "dum")
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(90, now + 0.28);
        osc2.frequency.exponentialRampToValueAtTime(30, now + 0.7);
        gain2.gain.setValueAtTime(0.001, now);
        gain2.gain.setValueAtTime(1.2, now + 0.28);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.28);
        osc2.stop(now + 2.5);

        // Harmonic metallic swell / shimmer
        const chords = [130.81, 164.81, 196.00, 261.63, 392.00]; // C minor / atmospheric chord
        chords.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + 0.28);
            osc.detune.setValueAtTime((idx - 2) * 8, now + 0.28);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now + 0.28);
            filter.frequency.exponentialRampToValueAtTime(2400, now + 0.9);
            filter.frequency.exponentialRampToValueAtTime(200, now + 3.2);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.setValueAtTime(0.12, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + 0.28);
            osc.stop(now + 3.4);
        });
    } catch (e) {
        console.warn('Audio playback error:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const replayBtn = document.getElementById('replayBtn');
    const letterButtons = document.querySelectorAll('.letter-btn');

    let currentLetter = 'N';

    function restartAnimation(letter = currentLetter, withAudio = true) {
        const currentIntro = container.querySelector('netflixintro');
        if (!currentIntro) return;

        // Clone element to cleanly re-trigger CSS animations
        const newIntro = currentIntro.cloneNode(true);
        newIntro.setAttribute('letter', letter);
        currentIntro.remove();
        container.insertBefore(newIntro, container.firstChild);

        if (withAudio) {
            playTudumSound();
        }
    }

    if (replayBtn) {
        replayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            restartAnimation(currentLetter, true);
        });
    }

    letterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            letterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLetter = btn.dataset.letter;
            restartAnimation(currentLetter, true);
        });
    });

    // Also replay on click anywhere in container outside controls
    container.addEventListener('click', (e) => {
        if (!e.target.closest('.controls')) {
            restartAnimation(currentLetter, true);
        }
    });
});
