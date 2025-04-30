
import React from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  highlight: { scale: 1.05, boxShadow: '0 0 15px rgba(155, 135, 245, 0.5)', transition: { duration: 0.2 } },
};

type BaseNodeProps = {
  data: {
    label: string;
    value?: string;
    description?: string;
    highlighted?: boolean;
    type?: string;
    column?: string;
  };
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  children?: React.ReactNode;
};

const BaseNode: React.FC<BaseNodeProps> = ({
  data,
  className,
  targetPosition = Position.Left,
  sourcePosition = Position.Right,
  children,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate={data.highlighted ? "highlight" : "visible"}
      variants={nodeVariants}
      className={cn("p-3 rounded-lg w-full max-w-[200px] border shadow-md", className)}
    >
      {targetPosition !== null && <Handle type="target" position={targetPosition} className="!bg-gray-500" />}
      
      <div className="font-medium mb-1">{data.label}</div>
      
      {data.value && (
        <div className="text-sm bg-gray-50 p-1.5 rounded border mt-1 font-mono">
          {data.value}
        </div>
      )}
      
      {data.description && (
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
      )}
      
      {children}
      
      {sourcePosition !== null && <Handle type="source" position={sourcePosition} className="!bg-gray-500" />}
    </motion.div>
  );
};

// Function Node with purple styling
export const FunctionNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-purple-400 bg-purple-50"
    />
  );
};

// Variable Node with blue styling
export const VariableNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-blue-400 bg-blue-50"
    />
  );
};

// Scope Node with green styling for different scope types
export const ScopeNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const scopeType = data.type || 'global';
  
  let className = "border-green-400 bg-green-50";
  if (scopeType === 'function') {
    className = "border-green-500 bg-green-50";
  } else if (scopeType === 'block') {
    className = "border-teal-400 bg-teal-50";
  }
  
  return (
    <BaseNode
      {...props}
      className={className}
    >
      <div className="text-xs uppercase tracking-wide text-gray-500 mt-2">
        {scopeType} scope
      </div>
      {props.children}
    </BaseNode>
  );
};

// Execution Context Node with deeper purple styling
export const ExecutionContextNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-purple-500 bg-purple-100"
    />
  );
};

// Stack Frame Node with blue styling
export const StackFrameNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-blue-500 bg-blue-100 text-blue-800"
    />
  );
};

// Heap Object Node with amber styling
export const HeapObjectNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-amber-400 bg-amber-50"
    />
  );
};

// Environment Record Node similar to your example
export const EnvironmentRecordNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const isOuter = data.label.toLowerCase().includes('outer');
  const isGlobal = data.label.toLowerCase().includes('global');
  
  let className = "border-cyan-400 bg-cyan-50";
  if (isOuter) {
    className = "border-green-500 bg-green-50";
  } else if (isGlobal) {
    className = "border-blue-400 bg-blue-50";
  }
  
  return (
    <BaseNode
      {...props}
      className={className}
    />
  );
};

export const nodeTypes = {
  functionNode: FunctionNode,
  variableNode: VariableNode,
  scopeNode: ScopeNode,
  executionContextNode: ExecutionContextNode,
  stackFrameNode: StackFrameNode,
  heapObjectNode: HeapObjectNode,
  environmentRecordNode: EnvironmentRecordNode,
};
