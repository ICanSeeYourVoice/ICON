importScripts("https://cdn.jsdelivr.net/npm/wavefile");

self.onmessage = function (e) {
  const soundData = e.data;

  const sound = new wavefile.WaveFile();
  sound.fromScratch(1, 16000, "32f", soundData);

  const blob = new Blob([sound.toBuffer()], { type: "audio/wav" });

  self.postMessage(blob);
};
