
import React, { useState, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { motion } from 'framer-motion';

import CodeEditor from './CodeEditor';
import StepControl from './StepControl';
import ExecutionFlow from './flow/ExecutionFlow';
import { CodeExample } from '@/types';

type VisualizerProps = {
  example: CodeExample;
  className?: string;
};

const Visualizer: React.FC<VisualizerProps> = ({ example, className }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms between steps
  
  const currentStep = example.steps[currentStepIndex];
  
  const handleNextStep = () => {
    if (currentStepIndex < example.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleStepChange = (step: number) => {
    setCurrentStepIndex(step);
  };
  
  const handlePlay = () => {
    if (currentStepIndex < example.steps.length - 1) {
      setIsPlaying(true);
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };
  
  // Autoplay functionality
  useEffect(() => {
    let playInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      playInterval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < example.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    
    return () => {
      if (playInterval) clearInterval(playInterval);
    };
  }, [isPlaying, example.steps.length, playbackSpeed]);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <motion.div 
          className="flex flex-col h-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-2">{example.title}</h2>
          <p className="text-muted-foreground mb-4">{example.description}</p>
          
          <CodeEditor 
            code={example.code}
            readOnly
            activeLine={currentStep.activeLine}
            className="flex-grow"
          />
          
          <StepControl
            currentStep={currentStepIndex}
            totalSteps={example.steps.length}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onStepChange={handleStepChange}
            onPlay={handlePlay}
            onPause={handlePause}
            isPlaying={isPlaying}
            onReset={handleReset}
            className="mt-4"
          />
        </motion.div>
        
        <motion.div 
          className="h-[500px] lg:h-full relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReactFlowProvider>
            <ExecutionFlow 
              step={currentStep}
              className="h-full rounded-lg border bg-secondary/20"
            />
          </ReactFlowProvider>
        </motion.div>
      </div>
    </div>
  );
};

export default Visualizer;
