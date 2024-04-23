import * as tf from "@tensorflow/tfjs";

const YamnetModelUrl =
  "https://www.kaggle.com/models/google/yamnet/TfJs/tfjs/1";

export const loadYamnetModel = async () => {
  return await tf.loadGraphModel(YamnetModelUrl, { fromTFHub: true }); // 텐서플로우로 모델 로드
};

export const processAudioData = (
  yamnet: tf.GraphModel,
  setIsBabyCry: (isCrying: boolean) => void
) => {
  return function (audioProcessingEvent: AudioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    let inputData = inputBuffer.getChannelData(0);

    const [scores, embeddings, spectrogram] = yamnet.predict(
      tf.tensor(inputData)
    );

    const top5 = tf.topk(scores, 3, true);
    const classes = top5.indices.dataSync();
    const probabilities = top5.values.dataSync();

    for (let i = 0; i < 3; i++) {
      if (classes[i] === 20 && probabilities[i] >= 0.5) {
        setIsBabyCry(true);
        return;
      }
    }
  };
};
