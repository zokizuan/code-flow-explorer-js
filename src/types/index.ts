
import { Node, Edge } from '@xyflow/react';

export type ExecutionStep = {
  id: string;
  code: string;
  activeLine: number;
  description: string;
  nodes: Node[];
  edges: Edge[];
};

export type CodeExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  steps: ExecutionStep[];
};

export type FlowNodeData = {
  label: string;
  value?: string;
  description?: string;
  highlighted?: boolean;
  type?: string;
};
