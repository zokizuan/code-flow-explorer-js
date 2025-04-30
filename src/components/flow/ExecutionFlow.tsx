
import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  Panel,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ExecutionStep, FlowNodeData } from '@/types';
import { nodeTypes } from './CustomNodes';
import { motion } from 'framer-motion';

type ExecutionFlowProps = {
  step: ExecutionStep;
  className?: string;
};

// Define column categories for the kanban layout
const KANBAN_COLUMNS = [
  { id: 'call-stack', label: 'Call Stack', color: 'bg-blue-100' },
  { id: 'execution-contexts', label: 'Execution Contexts', color: 'bg-purple-100' },
  { id: 'scopes', label: 'Scopes', color: 'bg-green-100' },
  { id: 'memory-heap', label: 'Memory Heap', color: 'bg-amber-100' }
];

// Helper function to determine which column a node belongs to
const getNodeColumn = (node: any) => {
  if (node.type === 'stackFrameNode' || node.id.includes('call-stack')) {
    return 'call-stack';
  } else if (node.type === 'executionContextNode') {
    return 'execution-contexts';
  } else if (node.type === 'scopeNode') {
    return 'scopes';
  } else if (node.type === 'heapObjectNode' || node.id.includes('heap')) {
    return 'memory-heap';
  }
  
  // Default to execution-contexts if no match
  return 'execution-contexts';
};

const ExecutionFlow: React.FC<ExecutionFlowProps> = ({ step, className }) => {
  const { fitView } = useReactFlow();

  // Organize nodes into kanban columns
  const organizedNodes = useMemo(() => {
    // Calculate column widths based on container
    const containerWidth = 1200; // Estimate, will be adjusted by fitView
    const columnWidth = containerWidth / KANBAN_COLUMNS.length;
    const columnPadding = 50;
    
    // Group nodes by column
    const columnNodes: Record<string, any[]> = {};
    KANBAN_COLUMNS.forEach(col => {
      columnNodes[col.id] = [];
    });
    
    step.nodes.forEach(node => {
      const columnId = getNodeColumn(node);
      columnNodes[columnId].push({ ...node });
    });
    
    // Position nodes within their columns
    const positionedNodes = [];
    
    KANBAN_COLUMNS.forEach((column, colIndex) => {
      const nodes = columnNodes[column.id];
      
      // Add column header node
      positionedNodes.push({
        id: `column-header-${column.id}`,
        type: 'group',
        position: { 
          x: colIndex * columnWidth + columnPadding / 2, 
          y: 20 
        },
        style: {
          width: columnWidth - columnPadding,
          height: 40,
          backgroundColor: column.color.replace('bg-', '#'),
          opacity: 0.7,
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 0,
        },
        data: { label: column.label },
      });
      
      // Position actual nodes
      nodes.forEach((node, nodeIndex) => {
        const x = colIndex * columnWidth + columnPadding;
        const y = 80 + nodeIndex * 120;
        
        positionedNodes.push({
          ...node,
          position: { x, y },
          // Add column info to the node data for potential styling
          data: {
            ...node.data,
            column: column.id
          },
          // Ensure extent is correctly typed if it exists
          ...(node.extent ? { extent: node.extent as 'parent' } : {})
        });
      });
    });
    
    return positionedNodes;
  }, [step.nodes]);

  // Use effect to fit view whenever the step changes
  React.useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 200 });
    }, 50);
  }, [step.id, fitView]);

  const handlePaneClick = useCallback(() => {
    // Provide a handler so users can click anywhere to interact
  }, []);

  return (
    <div className={className}>
      <ReactFlow
        nodes={organizedNodes}
        edges={step.edges} // Use actual edges from the step
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        attributionPosition="bottom-right"
        onPaneClick={handlePaneClick}
        elementsSelectable={true}
        nodesDraggable={false}
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
