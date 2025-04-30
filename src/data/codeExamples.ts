
import { CodeExample } from '@/types';
import { MarkerType } from 'reactflow';

// Closures example
const closuresExample = {
  id: 'closures',
  title: 'Closures in JavaScript',
  description: 'Understanding how closures capture and remember their lexical environment',
  code: `function createCounter() {
  let count = 0; // Declaration
  return function() {
    count = count + 1; // Assignment
    return count;
  };
}
const counter = createCounter();
counter(); // First call, count becomes 1
counter(); // Second call, count becomes 2`,
  steps: [
    {
      id: 'step-1',
      code: `function createCounter() {
  let count = 0; // Declaration
  return function() {
    count = count + 1; // Assignment
    return count;
  };
}`,
      activeLine: 1,
      description: 'Creating a function that will return another function (a closure)',
      nodes: [
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: {
            label: 'Global Execution Context',
            highlighted: true
          },
          position: { x: 350, y: 50 }
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: {
            label: 'Global Scope',
            type: 'global',
            highlighted: true
          },
          position: { x: 600, y: 50 }
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: {
            label: 'Memory Heap'
          },
          position: { x: 850, y: 50 }
        }
      ],
      edges: []
    },
    {
      id: 'step-2',
      code: `function createCounter() {
  let count = 0; // Declaration
  return function() {
    count = count + 1; // Assignment
    return count;
  };
}`,
      activeLine: 2,
      description: 'The function defines a local variable "count" initialized to 0',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: {
            label: 'Call Stack'
          },
          position: { x: 150, y: 50 }
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: {
            label: 'Global Execution Context'
          },
          position: { x: 350, y: 50 }
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: {
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 600, y: 50 }
        },
        {
          id: 'createCounter-func',
          type: 'functionNode',
          data: {
            label: 'createCounter',
            description: 'Function definition',
            highlighted: true
          },
          position: { x: 600, y: 150 },
          parentNode: 'global-scope',
          extent: 'parent'
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: {
            label: 'Memory Heap'
          },
          position: { x: 850, y: 50 }
        },
        {
          id: 'function-obj',
          type: 'heapObjectNode',
          data: {
            label: 'Function Object',
            value: 'createCounter',
            highlighted: true
          },
          position: { x: 850, y: 150 },
          parentNode: 'memory-heap',
          extent: 'parent'
        }
      ],
      edges: [
        {
          id: 'createCounter-to-obj',
          source: 'createCounter-func',
          target: 'function-obj',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow
          }
        }
      ]
    },
    {
      id: 'step-3',
      code: `function createCounter() {
  let count = 0; // Declaration
  return function() {
    count = count + 1; // Assignment
    return count;
  };
}
const counter = createCounter();`,
      activeLine: 7,
      description: 'We call createCounter() which returns a new function that references count in its closure',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: {
            label: 'Call Stack',
            highlighted: true
          },
          position: { x: 150, y: 50 }
        },
        {
          id: 'global-frame',
          type: 'stackFrameNode',
          data: {
            label: 'Global Frame'
          },
          position: { x: 150, y: 120 },
          parentNode: 'call-stack',
          extent: 'parent'
        },
        {
          id: 'createCounter-frame',
          type: 'stackFrameNode',
          data: {
            label: 'createCounter Frame',
            highlighted: true
          },
          position: { x: 150, y: 190 },
          parentNode: 'call-stack',
          extent: 'parent'
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: {
            label: 'Global Execution Context'
          },
          position: { x: 350, y: 50 }
        },
        {
          id: 'createCounter-ec',
          type: 'executionContextNode',
          data: {
            label: 'createCounter Execution Context',
            highlighted: true
          },
          position: { x: 350, y: 150 }
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: {
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 600, y: 50 }
        },
        {
          id: 'createCounter-scope',
          type: 'scopeNode',
          data: {
            label: 'createCounter Scope',
            type: 'function',
            highlighted: true
          },
          position: { x: 600, y: 150 }
        },
        {
          id: 'createCounter-func',
          type: 'functionNode',
          data: {
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 600, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent'
        },
        {
          id: 'count-var',
          type: 'variableNode',
          data: {
            label: 'count',
            value: '0',
            highlighted: true
          },
          position: { x: 600, y: 250 },
          parentNode: 'createCounter-scope',
          extent: 'parent'
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: {
            label: 'Memory Heap'
          },
          position: { x: 850, y: 50 }
        },
        {
          id: 'function-obj',
          type: 'heapObjectNode',
          data: {
            label: 'Function Object',
            value: 'createCounter'
          },
          position: { x: 850, y: 150 },
          parentNode: 'memory-heap',
          extent: 'parent'
        },
        {
          id: 'inner-function',
          type: 'heapObjectNode',
          data: {
            label: 'Inner Function',
            value: 'anonymous',
            highlighted: true
          },
          position: { x: 850, y: 250 },
          parentNode: 'memory-heap',
          extent: 'parent'
        }
      ],
      edges: [
        {
          id: 'createCounter-to-obj',
          source: 'createCounter-func',
          target: 'function-obj',
          markerEnd: {
            type: MarkerType.Arrow
          }
        },
        {
          id: 'scope-chain',
          source: 'createCounter-scope',
          target: 'global-scope',
          style: {
            stroke: '#7E69AB',
            strokeWidth: 2,
            strokeDasharray: '5 5'
          },
          markerEnd: {
            type: MarkerType.Arrow
          },
          label: 'outer scope'
        },
        {
          id: 'inner-function-closure',
          source: 'inner-function',
          target: 'count-var',
          animated: true,
          style: {
            stroke: '#F97316',
            strokeWidth: 2
          },
          markerEnd: {
            type: MarkerType.Arrow
          },
          label: 'closure'
        }
      ]
    },
    {
      id: 'step-4',
      code: `const counter = createCounter();
counter(); // First call, count becomes 1`,
      activeLine: 8,
      description: 'The counter function is assigned the returned inner function, which maintains access to count',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: {
            label: 'Call Stack'
          },
          position: { x: 150, y: 50 }
        },
        {
          id: 'global-frame',
          type: 'stackFrameNode',
          data: {
            label: 'Global Frame'
          },
          position: { x: 150, y: 120 },
          parentNode: 'call-stack',
          extent: 'parent'
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: {
            label: 'Global Execution Context'
          },
          position: { x: 350, y: 50 }
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: {
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 600, y: 50 }
        },
        {
          id: 'createCounter-func',
          type: 'functionNode',
          data: {
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 550, y: 150 },
          parentNode: 'global-scope',
          extent: 'parent'
        },
        {
          id: 'counter-var',
          type: 'variableNode',
          data: {
            label: 'counter',
            value: 'Function',
            highlighted: true
          },
          position: { x: 650, y: 150 },
          parentNode: 'global-scope',
          extent: 'parent'
        },
        {
          id: 'closure-scope',
          type: 'scopeNode',
          data: {
            label: 'Closure Scope',
            type: 'function',
            highlighted: true
          },
          position: { x: 600, y: 250 }
        },
        {
          id: 'count-var',
          type: 'variableNode',
          data: {
            label: 'count',
            value: '0',
            highlighted: true
          },
          position: { x: 600, y: 350 },
          parentNode: 'closure-scope',
          extent: 'parent'
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: {
            label: 'Memory Heap'
          },
          position: { x: 850, y: 50 }
        },
        {
          id: 'function-obj',
          type: 'heapObjectNode',
          data: {
            label: 'Function Object',
            value: 'createCounter'
          },
          position: { x: 850, y: 150 },
          parentNode: 'memory-heap',
          extent: 'parent'
        },
        {
          id: 'inner-function',
          type: 'heapObjectNode',
          data: {
            label: 'Inner Function',
            value: 'anonymous',
            highlighted: true
          },
          position: { x: 850, y: 250 },
          parentNode: 'memory-heap',
          extent: 'parent'
        }
      ],
      edges: [
        {
          id: 'createCounter-to-obj',
          source: 'createCounter-func',
          target: 'function-obj',
          markerEnd: {
            type: MarkerType.Arrow
          }
        },
        {
          id: 'counter-to-inner',
          source: 'counter-var',
          target: 'inner-function',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow
          }
        },
        {
          id: 'inner-function-closure',
          source: 'inner-function',
          target: 'closure-scope',
          style: {
            stroke: '#F97316',
            strokeWidth: 2
          },
          markerEnd: {
            type: MarkerType.Arrow
          },
          label: 'closure'
        }
      ]
    },
    {
      id: 'step-5',
      code: `counter(); // First call, count becomes 1
counter(); // Second call, count becomes 2`,
      activeLine: 9,
      description: 'When we call counter(), it executes the inner function which updates count in its closure',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: {
            label: 'Call Stack',
            highlighted: true
          },
          position: { x: 150, y: 50 }
        },
        {
          id: 'global-frame',
          type: 'stackFrameNode',
          data: {
            label: 'Global Frame'
          },
          position: { x: 150, y: 120 },
          parentNode: 'call-stack',
          extent: 'parent'
        },
        {
          id: 'counter-frame',
          type: 'stackFrameNode',
          data: {
            label: 'counter Frame',
            highlighted: true
          },
          position: { x: 150, y: 190 },
          parentNode: 'call-stack',
          extent: 'parent'
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: {
            label: 'Global Execution Context'
          },
          position: { x: 350, y: 50 }
        },
        {
          id: 'counter-ec',
          type: 'executionContextNode',
          data: {
            label: 'counter Execution Context',
            highlighted: true
          },
          position: { x: 350, y: 150 }
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: {
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 600, y: 50 }
        },
        {
          id: 'createCounter-func',
          type: 'functionNode',
          data: {
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 550, y: 150 },
          parentNode: 'global-scope',
          extent: 'parent'
        },
        {
          id: 'counter-var',
          type: 'variableNode',
          data: {
            label: 'counter',
            value: 'Function'
          },
          position: { x: 650, y: 150 },
          parentNode: 'global-scope',
          extent: 'parent'
        },
        {
          id: 'closure-scope',
          type: 'scopeNode',
          data: {
            label: 'Closure Scope',
            type: 'function',
            highlighted: true
          },
          position: { x: 600, y: 250 }
        },
        {
          id: 'count-var',
          type: 'variableNode',
          data: {
            label: 'count',
            value: '1',
            highlighted: true
          },
          position: { x: 600, y: 350 },
          parentNode: 'closure-scope',
          extent: 'parent'
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: {
            label: 'Memory Heap'
          },
          position: { x: 850, y: 50 }
        },
        {
          id: 'function-obj',
          type: 'heapObjectNode',
          data: {
            label: 'Function Object',
            value: 'createCounter'
          },
          position: { x: 850, y: 150 },
          parentNode: 'memory-heap',
          extent: 'parent'
        },
        {
          id: 'inner-function',
          type: 'heapObjectNode',
          data: {
            label: 'Inner Function',
            value: 'anonymous'
          },
          position: { x: 850, y: 250 },
          parentNode: 'memory-heap',
          extent: 'parent'
        },
        {
          id: 'result-value',
          type: 'heapObjectNode',
          data: {
            label: 'Return Value',
            value: '1',
            highlighted: true
          },
          position: { x: 850, y: 350 },
          parentNode: 'memory-heap',
          extent: 'parent'
        }
      ],
      edges: [
        {
          id: 'createCounter-to-obj',
          source: 'createCounter-func',
          target: 'function-obj',
          markerEnd: {
            type: MarkerType.Arrow
          }
        },
        {
          id: 'counter-to-inner',
          source: 'counter-var',
          target: 'inner-function',
          markerEnd: {
            type: MarkerType.Arrow
          }
        },
        {
          id: 'inner-function-closure',
          source: 'inner-function',
          target: 'closure-scope',
          style: {
            stroke: '#F97316',
            strokeWidth: 2
          },
          markerEnd: {
            type: MarkerType.Arrow
          },
          label: 'closure'
        },
        {
          id: 'counter-execution',
          source: 'counter-ec',
          target: 'count-var',
          animated: true,
          style: {
            stroke: '#9b87f5',
            strokeWidth: 2
          },
          markerEnd: {
            type: MarkerType.Arrow
          },
          label: 'updates'
        },
        {
          id: 'result-connection',
          source: 'count-var',
          target: 'result-value',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow
          }
        }
      ]
    }
  ]
};

// Putting all examples together
const examples: CodeExample[] = [
  closuresExample
];

export default examples;
