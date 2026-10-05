// Lightweight Web Audio API procedural sound engine for Gaming HUD
// No external audio files needed; 100% reliable, zero latency, ultra-lightweight.

let audioCtx = null;
let soundEnabled = true;
let userInteracted = false;

// Unlock AudioContext on first user gesture (click, keydown, touch)
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    userInteracted = true;
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  };

  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
}

// Initialize sound setting from localStorage
try {
  const saved = localStorage.getItem('zd_gaming_sfx');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch (e) {
  soundEnabled = true;
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  // Prevent browser AudioContext autoplay policy warnings prior to user gesture
  if (!userInteracted && (!audioCtx || audioCtx.state === 'suspended')) {
    return null;
  }

  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended' && userInteracted) {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

export const isSfxEnabled = () => soundEnabled;

export const toggleSfx = () => {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem('zd_gaming_sfx', String(soundEnabled));
  } catch (e) {}
  if (soundEnabled) {
    playClickSound();
  }
  return soundEnabled;
};

// Subtle high-tech hover blip
export const playHoverSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
};

// Cyber confirm / select chime
export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.setValueAtTime(780, now + 0.04);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + 0.12);
  } catch (e) {}
};

// Level Up / Quest Clear celebratory chime
export const playLevelUpSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      
      gain.gain.setValueAtTime(0.045, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.18);
    });
  } catch (e) {}
};

// Hologram / Modal Inspection expansion sound
export const playModalOpenSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.09);
    
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + 0.12);
  } catch (e) {}
};

// High-Tech Cyber Scanner Transition Sound
export const playScannerSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.7);
    
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + 0.75);
  } catch (e) {}
};
