
// We're using reactflow as the recommended import name in the new version
import { Node, Edge } from 'reactflow';

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
