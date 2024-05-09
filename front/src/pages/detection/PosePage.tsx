import { useState } from 'react';
import { FaceRecognizerCam } from '../../utils/faceRecognition';

const PosePage = () => { 
 
    const [features, setFeatures] = useState({
        hasLeftEyes: false,
        hasRightEyes: false,
        hasNose: false,
        hasMouth: false,
      });
    
    return (
        <div>
            <h1>Other Page</h1>
            <FaceRecognizerCam featuresDetected={features} setFeaturesDetected={setFeatures} />
            <p>Has Left eyes: {features.hasLeftEyes.toString()}</p>
            <p>Has Right eyes: {features.hasRightEyes.toString()}</p>
            <p>Has nose: {features.hasNose.toString()}</p>
            <p>Has mouth: {features.hasMouth.toString()}</p>
        </div>
    );
};

export default PosePage;
