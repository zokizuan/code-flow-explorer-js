
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  StepBack, 
  StepForward, 
  Play, 
  Pause,
  SkipBack
} from 'lucide-react';
import { cn } from '@/lib/utils';

type StepControlProps = {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onStepChange: (step: number) => void;
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
  onReset: () => void;
  className?: string;
};

const StepControl: React.FC<StepControlProps> = ({
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onStepChange,
  onPlay,
  onPause,
  isPlaying,
  onReset,
  className
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            disabled={currentStep === 0}
            title="Reset"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevStep}
            disabled={currentStep === 0 || isPlaying}
            title="Previous step"
          >
            <StepBack className="h-4 w-4" />
          </Button>
          {isPlaying ? (
            <Button
              variant="outline"
              size="icon"
              onClick={onPause}
              title="Pause"
            >
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={onPlay}
              disabled={currentStep === totalSteps - 1}
              title="Play"
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={onNextStep}
            disabled={currentStep === totalSteps - 1 || isPlaying}
            title="Next step"
          >
            <StepForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Slider
        value={[currentStep]}
        min={0}
        max={totalSteps - 1}
        step={1}
        onValueChange={(value) => onStepChange(value[0])}
        disabled={isPlaying}
        className="w-full"
      />
    </div>
  );
};

export default StepControl;
