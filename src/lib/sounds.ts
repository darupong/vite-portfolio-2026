// High-quality Web Audio API sound synthesizer.
// Requires NO external files, zero-dependency, works immediately, lightweight!

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

// 1. Keyboard tap click
export function playKeyboardClick() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore context blocked or failed audio playback
  }
}

// 2. High pitched chime for New Year / Christmas scale
export function playHolidayChime(preset: string) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (preset === "christmas") {
      // Christmas: Warm soft ascending bells (Jingle scale)
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        
        gain.gain.setValueAtTime(0, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.04, now + i * 0.09 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.4);
      });
    } 
    else if (preset === "newyear") {
      // New Year: Twinkly slide frequencies (fireworks whistle & burst)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.35);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

      // Burst sound after whistle
      setTimeout(() => {
        const burstOsc = ctx.createOscillator();
        const burstGain = ctx.createGain();
        burstOsc.type = "triangle";
        burstOsc.frequency.setValueAtTime(220, ctx.currentTime);
        burstOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);

        burstGain.gain.setValueAtTime(0.05, ctx.currentTime);
        burstGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        burstOsc.connect(burstGain);
        burstGain.connect(ctx.destination);
        burstOsc.start();
        burstOsc.stop(ctx.currentTime + 0.25);
      }, 350);
    } 
    else if (preset === "valentine") {
      // Valentine: Double gentle harmonizing chime (love scale)
      const freqs = [587.33, 739.99]; // D5, F#5
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.5);
      });
    } 
    else if (preset === "songkran") {
      // Songkran: Water bubble pops
      const notes = [600, 900, 750, 1100];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        osc.frequency.exponentialRampToValueAtTime(2000, now + i * 0.07 + 0.03);

        gain.gain.setValueAtTime(0.015, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.04);
      });
    } 
    else if (preset === "halloween") {
      // Halloween: Low spooky gong/wind tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, now); // low A2
      osc.frequency.linearRampToValueAtTime(90, now + 0.6);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      // Add a lowpass filter to make it spookier
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(now + 0.6);
    } 
    else {
      // Standard click transition chime (Midnight, Pearl, Ubuntu, Cyber)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.06); // A5

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Ignore failures
  }
}
