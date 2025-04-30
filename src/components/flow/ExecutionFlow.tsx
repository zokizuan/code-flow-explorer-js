
import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ExecutionStep } from '@/types';
import { nodeTypes } from './CustomNodes';
import { motion } from 'framer-motion';

type ExecutionFlowProps = {
  step: ExecutionStep;
  className?: string;
};

const ExecutionFlow: React.FC<ExecutionFlowProps> = ({ step, className }) => {
  const { fitView } = useReactFlow();

  // Use effect to fit view whenever the step changes
  React.useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 200 });
    }, 50);
  }, [step.id, fitView]);

  return (
    <div className={className}>
      <ReactFlow
        nodes={step.nodes}
        edges={step.edges}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#f8f8fc" gap={16} />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={step.id}
        className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border shadow-md"
      >
        <p className="text-sm">{step.description}</p>
      </motion.div>
    </div>
  );
};

export default ExecutionFlow;
