const audioContext = new AudioContext();

const buffer = audioContext.createBuffer(1,audioContext.sampleRate * 1, audioContext.sampleRate);

const channelData = buffer.getChannelData(0);

for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;
}


const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(1, 0);
primaryGainControl.connect(audioContext.destination);

const button = document.getElementById('white');
button.addEventListener('click', () => {
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.connect(primaryGainControl);
    whiteNoiseSource.start();
});

const snareFilter = audioContext.createBiquadFilter();
snareFilter.type = 'highpass';
snareFilter.frequency.value = 1500;
snareFilter.connect(primaryGainControl);

const snareButton = document.querySelector('#snare');
snareButton.addEventListener('click', () => {
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    // whiteNoiseSource.start();

    const whiteNoiseGain = audioContext.createGain();
    whiteNoiseGain.gain.setValueAtTime(1, audioContext.currentTime);
    whiteNoiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    whiteNoiseSource.connect(whiteNoiseGain);
    whiteNoiseGain.connect(snareFilter);

    whiteNoiseSource.start();
    whiteNoiseSource.stop(audioContext.currentTime + 0.2);

    const snareOscillator = audioContext.createOscillator();
    snareOscillator.type = 'triangle';
    snareOscillator.frequency.setValueAtTime(250, audioContext.currentTime);

    const oscillatorGain = audioContext.createGain();
    oscillatorGain.gain.setValueAtTime(0.7, audioContext.currentTime);
    oscillatorGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    snareOscillator.connect(oscillatorGain);
    oscillatorGain.connect(primaryGainControl);
    snareOscillator.start();
    snareOscillator.stop(audioContext.currentTime + 0.2);
});

const kickButton = document.querySelector('#kick');
kickButton.addEventListener('click', () => {
    const kickOscillator = audioContext.createOscillator();
    kickOscillator.frequency.setValueAtTime(150, 0);
    kickOscillator.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    const kickGain = audioContext.createGain();
    kickGain.gain.setValueAtTime(1, 0);
    kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    kickOscillator.connect(kickGain);
    kickGain.connect(primaryGainControl);
    kickOscillator.start();
    kickOscillator.stop(audioContext.currentTime + 0.5);
});