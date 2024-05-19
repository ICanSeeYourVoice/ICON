import * as tf from "@tensorflow/tfjs";

const YamnetModelUrl =
  "https://www.kaggle.com/models/google/yamnet/TfJs/tfjs/1";

export const loadYamnetModel = async () => {
  return await tf.loadGraphModel(YamnetModelUrl, { fromTFHub: true }); // 텐서플로우로 모델 로드
};
