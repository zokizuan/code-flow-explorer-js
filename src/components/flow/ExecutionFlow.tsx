
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

// Define column categories to better organize the visualization
const LAYOUT_COLUMNS = {
  CALLSTACK: { x: 100, width: 150 },
  EXECUTION_CONTEXTS: { x: 300, width: 200 },
  SCOPES: { x: 550, width: 200 },
  MEMORY: { x: 800, width: 250 }
};

const ExecutionFlow: React.FC<ExecutionFlowProps> = ({ step, className }) => {
  const { fitView } = useReactFlow();

  // Apply layout categorization to nodes
  const organizedNodes = useMemo(() => {
    // Don't modify nodes from examples directly, create a new array
    return step.nodes.map(node => {
      const newNode = { ...node };
      
      // Set positions based on node types for better categorization
      if (node.type === 'stackFrameNode' && !node.parentNode && node.id.includes('call-stack')) {
        newNode.position = { 
          x: LAYOUT_COLUMNS.CALLSTACK.x, 
          y: node.position.y 
        };
      } 
      else if (node.type === 'executionContextNode') {
        newNode.position = { 
          x: LAYOUT_COLUMNS.EXECUTION_CONTEXTS.x, 
          y: node.position.y 
        };
      }
      else if (node.type === 'scopeNode' && !node.parentNode) {
        newNode.position = { 
          x: LAYOUT_COLUMNS.SCOPES.x, 
          y: node.position.y
        };
      }
      else if (node.type === 'heapObjectNode' && !node.parentNode) {
        newNode.position = { 
          x: LAYOUT_COLUMNS.MEMORY.x, 
          y: node.position.y 
        };
      }
      
      return newNode;
    });
  }, [step.nodes]);

  // Use effect to fit view whenever the step changes
  React.useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 200 });
    }, 50);
  }, [step.id, fitView]);

  return (
    <div className={className}>
      <div className="absolute top-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border shadow-sm z-10 flex justify-between">
        <div className="text-xs font-medium">
          <span className="bg-blue-100 px-2 py-1 rounded mr-2">Call Stack</span>
          <span className="bg-purple-100 px-2 py-1 rounded mr-2">Execution Contexts</span>
          <span className="bg-green-100 px-2 py-1 rounded mr-2">Scopes</span>
          <span className="bg-amber-100 px-2 py-1 rounded">Memory Heap</span>
        </div>
      </div>
      
      <ReactFlow
        nodes={organizedNodes}
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
