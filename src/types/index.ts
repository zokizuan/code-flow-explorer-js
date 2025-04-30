
import { Node, Edge } from 'reactflow';

export type FlowNodeData = {
  label: string;
  value?: string;
  description?: string;
  highlighted?: boolean;
  type?: string;
  column?: string;
};

export type ExecutionStep = {
  id: string;
  code: string;
  activeLine: number;
  description: string;
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
};

export type CodeExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  steps: ExecutionStep[];
};
