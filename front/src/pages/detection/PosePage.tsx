import { SetStateAction, useState } from 'react';
import { FaceRecognizerCam } from '../../utils/babyFaceRecognition';

const PosePage = () => {
    const [detectedFeatures, setDetectedFeatures] = useState({
        hasEyes: false,
        hasNose: false,
        hasMouth: false
    });

    const handleFeaturesDetected = (features: SetStateAction<{ hasEyes: boolean; hasNose: boolean; hasMouth: boolean; }>) => {
        setDetectedFeatures(features);
    };

    return (
        <div>
            <h1>Other Page</h1>
            <FaceRecognizerCam onFeaturesDetected={handleFeaturesDetected} />
            <p>Has eyes: {detectedFeatures.hasEyes.toString()}</p>
            <p>Has nose: {detectedFeatures.hasNose.toString()}</p>
            <p>Has mouth: {detectedFeatures.hasMouth.toString()}</p>
        </div>
    );
};

export default PosePage;
