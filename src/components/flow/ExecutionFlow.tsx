
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
  CALLSTACK: { x: 150, width: 150, label: 'Call Stack' },
  EXECUTION_CONTEXTS: { x: 350, width: 200, label: 'Execution Contexts' },
  SCOPES: { x: 600, width: 200, label: 'Scopes' },
  MEMORY: { x: 850, width: 250, label: 'Memory Heap' }
};

const ExecutionFlow: React.FC<ExecutionFlowProps> = ({ step, className }) => {
  const { fitView } = useReactFlow();

  // Apply layout categorization to nodes
  const organizedNodes = useMemo(() => {
    const columnYPositions = {
      [LAYOUT_COLUMNS.CALLSTACK.label]: 100,
      [LAYOUT_COLUMNS.EXECUTION_CONTEXTS.label]: 100,
      [LAYOUT_COLUMNS.SCOPES.label]: 100,
      [LAYOUT_COLUMNS.MEMORY.label]: 100
    };
    
    // First pass to position parent nodes
    const parentNodes = step.nodes.filter(node => !node.parentNode);
    
    // Don't modify nodes from examples directly, create a new array
    return step.nodes.map(node => {
      const newNode = { ...node };
      
      // Skip nodes that already have parents
      if (node.parentNode) {
        return newNode;
      }
      
      // Set positions based on node types for better categorization
      if (node.type === 'stackFrameNode' || node.id.includes('call-stack')) {
        newNode.position = { 
          x: LAYOUT_COLUMNS.CALLSTACK.x, 
          y: columnYPositions[LAYOUT_COLUMNS.CALLSTACK.label]
        };
        columnYPositions[LAYOUT_COLUMNS.CALLSTACK.label] += 100;
      } 
      else if (node.type === 'executionContextNode') {
        newNode.position = { 
          x: LAYOUT_COLUMNS.EXECUTION_CONTEXTS.x, 
          y: columnYPositions[LAYOUT_COLUMNS.EXECUTION_CONTEXTS.label]
        };
        columnYPositions[LAYOUT_COLUMNS.EXECUTION_CONTEXTS.label] += 100;
      }
      else if (node.type === 'scopeNode') {
        newNode.position = { 
          x: LAYOUT_COLUMNS.SCOPES.x, 
          y: columnYPositions[LAYOUT_COLUMNS.SCOPES.label]
        };
        columnYPositions[LAYOUT_COLUMNS.SCOPES.label] += 100;
      }
      else if (node.type === 'heapObjectNode' || node.id.includes('heap')) {
        newNode.position = { 
          x: LAYOUT_COLUMNS.MEMORY.x, 
          y: columnYPositions[LAYOUT_COLUMNS.MEMORY.label]
        };
        columnYPositions[LAYOUT_COLUMNS.MEMORY.label] += 100;
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
      <div className="absolute top-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border shadow-sm z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-blue-100 px-3 py-1 rounded text-xs font-medium">{LAYOUT_COLUMNS.CALLSTACK.label}</span>
          <span className="bg-purple-100 px-3 py-1 rounded text-xs font-medium">{LAYOUT_COLUMNS.EXECUTION_CONTEXTS.label}</span>
          <span className="bg-green-100 px-3 py-1 rounded text-xs font-medium">{LAYOUT_COLUMNS.SCOPES.label}</span>
          <span className="bg-amber-100 px-3 py-1 rounded text-xs font-medium">{LAYOUT_COLUMNS.MEMORY.label}</span>
        </div>
      </div>
      
      <ReactFlow
        nodes={organizedNodes}
        edges={step.edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        attributionPosition="bottom-right"
      >
        <Background color="#f8f8fc" gap={16} />
        <Controls />
        <MiniMap 
          nodeStrokeWidth={3} 
          zoomable 
          pannable 
          nodeBorderRadius={2}
        />
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
