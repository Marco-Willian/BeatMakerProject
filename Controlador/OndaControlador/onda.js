const audioContext = new AudioContext();

const buffer = audioContext.createBuffer(1,audioContext.sampleRate * 1, audioContext.sampleRate);

const channelData = buffer.getChannelData(0);

for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;
}


const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
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
    const snareNoise = audioContext.createBufferSource();
    snareNoise.buffer = buffer;
    snareNoise.connect(snareFilter);
    snareNoise.start();
})