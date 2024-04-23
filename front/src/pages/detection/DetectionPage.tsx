import { PulseLoader } from "react-spinners";
import ReactButton from "../../components/main/detection/ReactButton";
import {
  DETECTION,
  DETECTION_INFO,
  LOADING_INFO,
} from "../../constants/detection";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";
import { useDetectionStore } from "../../stores/detection";
import {
  loadYamnetModel,
  processAudioData,
} from "../../utils/cryingClassification";

const DetectionPage = () => {
  const model = useRef<tf.GraphModel | null>(null);
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      const yamnet = await loadYamnetModel();
      model.current = yamnet;
      const constraints = { audio: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const audioCtx = new AudioContext({ sampleRate: 16000 });
      const source = audioCtx.createMediaStreamSource(stream);
      const scriptNode = audioCtx.createScriptProcessor(8192, 1, 1);

      scriptNode.onaudioprocess = processAudioData(yamnet, setIsBabyCry);

      source.connect(scriptNode);
      scriptNode.connect(audioCtx.destination);
    };

    fetchDataAndProcess();

    return () => {
      if (model.current) {
        model.current.dispose();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-gray-1 text-sm ">
        {isBabyCry ? LOADING_INFO : DETECTION_INFO}
      </p>
      <ReactButton
        icon={isBabyCry ? DETECTION.LOADING.ICON : DETECTION.NORMAL.ICON}
        color={isBabyCry ? DETECTION.LOADING.COLOR : DETECTION.NORMAL.COLOR}
      />
      {isBabyCry ? (
        <PulseLoader color="#c8c8c8" />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-0 text-2xl">
          <p>아기가</p>
          <p>
            <span className="text-white">{DETECTION.NORMAL.MESSAGE}</span>
            상태에요
          </p>
        </div>
      )}
    </div>
  );
};

export default DetectionPage;
