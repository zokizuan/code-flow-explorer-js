
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
  };
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  children?: React.ReactNode;
};

const BaseNode: React.FC<BaseNodeProps> = ({
  data,
  className,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
  children,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate={data.highlighted ? "highlight" : "visible"}
      variants={nodeVariants}
      className={cn("p-3 rounded-lg min-w-[100px] border bg-white shadow-md", className)}
    >
      {targetPosition !== null && <Handle type="target" position={targetPosition} />}
      
      <div className="font-medium mb-1">{data.label}</div>
      
      {data.value && (
        <div className="text-sm bg-gray-50 p-1 rounded border mt-1">
          {data.value}
        </div>
      )}
      
      {data.description && (
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
      )}
      
      {children}
      
      {sourcePosition !== null && <Handle type="source" position={sourcePosition} />}
    </motion.div>
  );
};

export const FunctionNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-purple-400 bg-purple-50"
    />
  );
};

export const VariableNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-blue-400 bg-blue-50"
    />
  );
};

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

export const ExecutionContextNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-purple-500 bg-purple-100"
    />
  );
};

export const StackFrameNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-blue-500 bg-blue-100"
    />
  );
};

export const HeapObjectNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      className="border-amber-400 bg-amber-50"
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
};
