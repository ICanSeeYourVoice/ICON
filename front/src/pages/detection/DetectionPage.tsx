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
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const DetectionPage = () => {
  const navigate = useNavigate();

  const model = useRef<tf.GraphModel | null>(null);
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);

  const cryingType = useDetectionStore((state: any) => state.cryingType);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      let toastId;

      try {
        toastId = toast.loading("아기울음감지를 준비 중입니다.");

        const yamnet = await loadYamnetModel();
        model.current = yamnet;
        const constraints = { audio: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        const audioCtx = new AudioContext({ sampleRate: 16000 });
        const source = audioCtx.createMediaStreamSource(stream);
        const scriptNode = audioCtx.createScriptProcessor(8192, 1, 1);

        scriptNode.onaudioprocess = processAudioData(
          yamnet,
          setIsBabyCry,
          setCryingType
        );

        source.connect(scriptNode);
        scriptNode.connect(audioCtx.destination);

        toast.success("울음감지 시작");
      } catch (error) {
        toast.error("아기울음감지를 준비 중 오류가 발생했습니다.");
      } finally {
        toast.dismiss(toastId);
      }
    };

    if (!isBabyCry) fetchDataAndProcess();

    return () => {
      if (model.current) {
        model.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (cryingType !== 0) {
      navigate("/detection/result");
    }
  }, [cryingType]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
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
        <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
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
