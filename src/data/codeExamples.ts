import { CodeExample } from '@/types';
import { MarkerType } from 'reactflow';

// Closure function example
const closureExample: CodeExample = {
  id: 'closure-example',
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
          data: { label: 'Global Execution Context', highlighted: true },
          position: { x: 200, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope', 
            type: 'global',
            highlighted: true 
          },
          position: { x: 200, y: 150 },
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 500, y: 150 },
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'createCounter',
            highlighted: true
          },
          position: { x: 500, y: 250 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'createCounter',
          type: 'functionNode',
          data: { 
            label: 'createCounter',
            description: 'Function definition',
            highlighted: true
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'function-to-def',
          source: 'createCounter',
          target: 'function-def',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
      ],
    },
    {
      id: 'step-2',
      code: `const counter = createCounter();`,
      activeLine: 7,
      description: 'Calling createCounter() creates a new function with access to its own count variable',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack', highlighted: true },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'createCounter-ec-stack',
          type: 'stackFrameNode',
          data: { 
            label: 'createCounter EC',
            highlighted: true 
          },
          position: { x: 100, y: 220 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 250, y: 50 },
        },
        {
          id: 'createCounter-ec',
          type: 'executionContextNode',
          data: { 
            label: 'createCounter Execution Context',
            highlighted: true 
          },
          position: { x: 450, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 250, y: 150 },
        },
        {
          id: 'createCounter-scope',
          type: 'scopeNode',
          data: { 
            label: 'createCounter Scope',
            type: 'function',
            highlighted: true 
          },
          position: { x: 450, y: 150 },
        },
        {
          id: 'count-var',
          type: 'variableNode',
          data: { 
            label: 'count', 
            value: '0',
            highlighted: true 
          },
          position: { x: 450, y: 250 },
          parentNode: 'createCounter-scope',
          extent: 'parent',
        },
        {
          id: 'createCounter',
          type: 'functionNode',
          data: { 
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 250, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 650, y: 150 },
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'createCounter'
          },
          position: { x: 650, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'inner-function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Inner Function Object', 
            value: 'anonymous',
            highlighted: true
          },
          position: { x: 650, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'function-to-def',
          source: 'createCounter',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'inner-scope-link',
          source: 'inner-function-def',
          target: 'createCounter-scope',
          style: { stroke: '#7E69AB', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'closure',
          animated: true,
        },
      ],
    },
    {
      id: 'step-3',
      code: `const counter = createCounter();`,
      activeLine: 7,
      description: 'The counter variable now holds the inner function with its closure',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack' },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC', highlighted: true },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context', highlighted: true },
          position: { x: 250, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global',
            highlighted: true
          },
          position: { x: 250, y: 150 },
        },
        {
          id: 'createCounter',
          type: 'functionNode',
          data: { 
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'counter-var',
          type: 'variableNode',
          data: { 
            label: 'counter', 
            value: 'function()',
            highlighted: true
          },
          position: { x: 350, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 550, y: 150 },
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'createCounter'
          },
          position: { x: 500, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'inner-function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Inner Function Object', 
            value: 'anonymous',
            highlighted: true
          },
          position: { x: 500, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'closure-env',
          type: 'scopeNode',
          data: { 
            label: 'Closure Environment',
            type: 'function',
            highlighted: true
          },
          position: { x: 650, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'count-var-closure',
          type: 'variableNode',
          data: { 
            label: 'count', 
            value: '0',
            highlighted: true
          },
          position: { x: 650, y: 380 },
          parentNode: 'closure-env',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'function-to-def',
          source: 'createCounter',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'counter-to-inner',
          source: 'counter-var',
          target: 'inner-function-def',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'inner-to-closure',
          source: 'inner-function-def',
          target: 'closure-env',
          animated: true,
          style: { stroke: '#7E69AB', strokeWidth: 2 },
          markerEnd: { type: MarkerType.Arrow },
          label: 'closure',
        },
      ],
    },
    {
      id: 'step-4',
      code: `counter(); // First call, count becomes 1`,
      activeLine: 8,
      description: 'First call to counter() increments count to 1 using the closed-over variable',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack', highlighted: true },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 120 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'counter-ec-stack',
          type: 'stackFrameNode',
          data: { 
            label: 'Counter Function EC',
            highlighted: true 
          },
          position: { x: 100, y: 180 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 250, y: 50 },
        },
        {
          id: 'counter-ec',
          type: 'executionContextNode',
          data: { 
            label: 'Counter Function Execution Context',
            highlighted: true 
          },
          position: { x: 450, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 250, y: 150 },
        },
        {
          id: 'counter-scope',
          type: 'scopeNode',
          data: { 
            label: 'Counter Function Scope',
            type: 'function',
            highlighted: true 
          },
          position: { x: 450, y: 150 },
        },
        {
          id: 'createCounter',
          type: 'functionNode',
          data: { 
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 200, y: 220 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'counter-var',
          type: 'variableNode',
          data: { 
            label: 'counter', 
            value: 'function()'
          },
          position: { x: 350, y: 220 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 650, y: 150 },
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'createCounter'
          },
          position: { x: 600, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'inner-function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Inner Function Object', 
            value: 'anonymous'
          },
          position: { x: 600, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'closure-env',
          type: 'scopeNode',
          data: { 
            label: 'Closure Environment',
            type: 'function'
          },
          position: { x: 700, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'count-var-closure',
          type: 'variableNode',
          data: { 
            label: 'count', 
            value: '1',
            highlighted: true
          },
          position: { x: 700, y: 380 },
          parentNode: 'closure-env',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'function-to-def',
          source: 'createCounter',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'counter-to-inner',
          source: 'counter-var',
          target: 'inner-function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'inner-to-closure',
          source: 'inner-function-def',
          target: 'closure-env',
          style: { stroke: '#7E69AB', strokeWidth: 2 },
          markerEnd: { type: MarkerType.Arrow },
          label: 'closure',
        },
        {
          id: 'counter-ec-to-closure',
          source: 'counter-ec',
          target: 'count-var-closure',
          animated: true,
          style: { stroke: '#9b87f5', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'access & update',
        },
      ],
    },
    {
      id: 'step-5',
      code: `counter(); // Second call, count becomes 2`,
      activeLine: 9,
      description: 'Second call to counter() increments the same closed-over count variable to 2',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack', highlighted: true },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 120 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'counter-ec-stack',
          type: 'stackFrameNode',
          data: { 
            label: 'Counter Function EC',
            highlighted: true 
          },
          position: { x: 100, y: 180 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 250, y: 50 },
        },
        {
          id: 'counter-ec',
          type: 'executionContextNode',
          data: { 
            label: 'Counter Function Execution Context',
            highlighted: true 
          },
          position: { x: 450, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 250, y: 150 },
        },
        {
          id: 'counter-scope',
          type: 'scopeNode',
          data: { 
            label: 'Counter Function Scope',
            type: 'function',
            highlighted: true 
          },
          position: { x: 450, y: 150 },
        },
        {
          id: 'createCounter',
          type: 'functionNode',
          data: { 
            label: 'createCounter',
            description: 'Function definition'
          },
          position: { x: 200, y: 220 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'counter-var',
          type: 'variableNode',
          data: { 
            label: 'counter', 
            value: 'function()'
          },
          position: { x: 350, y: 220 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 650, y: 150 },
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'createCounter'
          },
          position: { x: 600, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'inner-function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Inner Function Object', 
            value: 'anonymous'
          },
          position: { x: 600, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'closure-env',
          type: 'scopeNode',
          data: { 
            label: 'Closure Environment',
            type: 'function'
          },
          position: { x: 700, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'count-var-closure',
          type: 'variableNode',
          data: { 
            label: 'count', 
            value: '2',
            highlighted: true
          },
          position: { x: 700, y: 380 },
          parentNode: 'closure-env',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'function-to-def',
          source: 'createCounter',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'counter-to-inner',
          source: 'counter-var',
          target: 'inner-function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'inner-to-closure',
          source: 'inner-function-def',
          target: 'closure-env',
          style: { stroke: '#7E69AB', strokeWidth: 2 },
          markerEnd: { type: MarkerType.Arrow },
          label: 'closure',
        },
        {
          id: 'counter-ec-to-closure',
          source: 'counter-ec',
          target: 'count-var-closure',
          animated: true,
          style: { stroke: '#9b87f5', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'access & update',
        },
      ],
    }
  ],
};

// Basic function example
const functionScopeExample: CodeExample = {
  id: 'function-scope',
  title: 'Function Scope',
  description: 'Understanding function scope and variable visibility',
  code: `let globalVar = "I'm global";

function exampleFunction() {
  let functionVar = "I'm in a function";
  console.log(globalVar);
  console.log(functionVar);
}

exampleFunction();
console.log(globalVar);
// console.log(functionVar); // This would cause an error
`,
  steps: [
    {
      id: 'step-1',
      code: `let globalVar = "I'm global";`,
      activeLine: 1,
      description: 'Creating a global variable in the Global Execution Context',
      nodes: [
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context', highlighted: true },
          position: { x: 300, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope', 
            type: 'global',
            highlighted: true 
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"',
            highlighted: true 
          },
          position: { x: 300, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 550, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"',
            highlighted: true 
          },
          position: { x: 550, y: 250 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
      ],
    },
    {
      id: 'step-2',
      code: `function exampleFunction() {
  let functionVar = "I'm in a function";
  console.log(globalVar);
  console.log(functionVar);
}`,
      activeLine: 3,
      description: 'Function definition is stored in memory but not executed yet',
      nodes: [
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction', 
            description: 'Function definition',
            highlighted: true
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 550, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 500, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction',
            highlighted: true
          },
          position: { x: 500, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
      ],
    },
    {
      id: 'step-3',
      code: `exampleFunction();`,
      activeLine: 7,
      description: 'Function is called, creating a new Execution Context and pushing it onto the call stack',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack', highlighted: true },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'function-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'exampleFunction EC' },
          position: { x: 100, y: 220 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'function-ec',
          type: 'executionContextNode',
          data: { 
            label: 'Function Execution Context',
            highlighted: true 
          },
          position: { x: 500, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'function-scope',
          type: 'scopeNode',
          data: { 
            label: 'Function Scope',
            type: 'function',
            highlighted: true 
          },
          position: { x: 500, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition',
            highlighted: true
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 700, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 650, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 650, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-scope-link',
          source: 'function-scope',
          target: 'global-scope',
          animated: true,
          style: { stroke: '#7E69AB', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'outer scope',
        },
      ],
    },
    {
      id: 'step-4',
      code: `let functionVar = "I'm in a function";`,
      activeLine: 3,
      description: 'Local variable is created in the function scope',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack' },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'function-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'exampleFunction EC' },
          position: { x: 100, y: 220 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'function-ec',
          type: 'executionContextNode',
          data: { label: 'Function Execution Context' },
          position: { x: 500, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'function-scope',
          type: 'scopeNode',
          data: { 
            label: 'Function Scope',
            type: 'function'
          },
          position: { x: 500, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition'
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'functionVar',
          type: 'variableNode',
          data: { 
            label: 'functionVar', 
            value: '"I\'m in a function"',
            highlighted: true
          },
          position: { x: 500, y: 250 },
          parentNode: 'function-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 700, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 650, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 650, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'string-function',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m in a function"',
            highlighted: true
          },
          position: { x: 650, y: 380 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'functionVar-to-string',
          source: 'functionVar',
          target: 'string-function',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-scope-link',
          source: 'function-scope',
          target: 'global-scope',
          style: { stroke: '#7E69AB', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'outer scope',
        },
      ],
    },
    {
      id: 'step-5',
      code: `console.log(globalVar);`,
      activeLine: 4,
      description: 'Function can access variables from its outer (global) scope',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack' },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'function-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'exampleFunction EC' },
          position: { x: 100, y: 220 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'function-ec',
          type: 'executionContextNode',
          data: { label: 'Function Execution Context' },
          position: { x: 500, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'function-scope',
          type: 'scopeNode',
          data: { 
            label: 'Function Scope',
            type: 'function'
          },
          position: { x: 500, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"',
            highlighted: true
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition'
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'functionVar',
          type: 'variableNode',
          data: { 
            label: 'functionVar', 
            value: '"I\'m in a function"'
          },
          position: { x: 500, y: 250 },
          parentNode: 'function-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 700, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 650, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 650, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'string-function',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m in a function"'
          },
          position: { x: 650, y: 380 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'functionVar-to-string',
          source: 'functionVar',
          target: 'string-function',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-scope-link',
          source: 'function-scope',
          target: 'global-scope',
          style: { stroke: '#7E69AB', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'outer scope',
          animated: true,
        },
        {
          id: 'scope-chain-access',
          source: 'function-ec',
          target: 'globalVar',
          animated: true,
          style: { stroke: '#9b87f5', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'scope chain lookup',
        },
      ],
    },
    {
      id: 'step-6',
      code: `console.log(functionVar);`,
      activeLine: 5,
      description: 'Accessing a variable from the current function scope',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack' },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'function-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'exampleFunction EC' },
          position: { x: 100, y: 220 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'function-ec',
          type: 'executionContextNode',
          data: { label: 'Function Execution Context' },
          position: { x: 500, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'function-scope',
          type: 'scopeNode',
          data: { 
            label: 'Function Scope',
            type: 'function'
          },
          position: { x: 500, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition'
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'functionVar',
          type: 'variableNode',
          data: { 
            label: 'functionVar', 
            value: '"I\'m in a function"',
            highlighted: true
          },
          position: { x: 500, y: 250 },
          parentNode: 'function-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 700, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 650, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 650, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'string-function',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m in a function"'
          },
          position: { x: 650, y: 380 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'functionVar-to-string',
          source: 'functionVar',
          target: 'string-function',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-scope-link',
          source: 'function-scope',
          target: 'global-scope',
          style: { stroke: '#7E69AB', strokeWidth: 2, strokeDasharray: '5 5' },
          markerEnd: { type: MarkerType.Arrow },
          label: 'outer scope',
        },
        {
          id: 'direct-access',
          source: 'function-ec',
          target: 'functionVar',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
          label: 'direct access',
        },
      ],
    },
    {
      id: 'step-7',
      code: `} // end of function

exampleFunction();`,
      activeLine: 7,
      description: 'Function execution is complete, its execution context is popped off the stack',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack', highlighted: true },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC', highlighted: true },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context', highlighted: true },
          position: { x: 300, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition'
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 500, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 450, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 450, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'garbage-collector',
          type: 'executionContextNode',
          data: { 
            label: 'Garbage Collection',
            description: 'Function variables are no longer accessible',
            highlighted: true
          },
          position: { x: 500, y: 380 },
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
      ],
    },
    {
      id: 'step-8',
      code: `console.log(globalVar);`,
      activeLine: 8,
      description: 'Back in global context, we can access global variables',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack' },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"',
            highlighted: true
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition'
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 500, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"',
            highlighted: true
          },
          position: { x: 450, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 450, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'global-access',
          source: 'global-ec',
          target: 'globalVar',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
      ],
    },
    {
      id: 'step-9',
      code: `// console.log(functionVar); // This would cause an error`,
      activeLine: 9,
      description: 'Trying to access function-scoped variables from outside would cause an error - they are not in the scope chain',
      nodes: [
        {
          id: 'call-stack',
          type: 'stackFrameNode',
          data: { label: 'Call Stack' },
          position: { x: 100, y: 50 },
        },
        {
          id: 'global-ec-stack',
          type: 'stackFrameNode',
          data: { label: 'Global EC' },
          position: { x: 100, y: 150 },
          parentNode: 'call-stack',
          extent: 'parent',
        },
        {
          id: 'global-ec',
          type: 'executionContextNode',
          data: { label: 'Global Execution Context' },
          position: { x: 300, y: 50 },
        },
        {
          id: 'global-scope',
          type: 'scopeNode',
          data: { 
            label: 'Global Scope',
            type: 'global'
          },
          position: { x: 300, y: 150 },
        },
        {
          id: 'globalVar',
          type: 'variableNode',
          data: { 
            label: 'globalVar', 
            value: '"I\'m global"'
          },
          position: { x: 200, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'exampleFunction',
          type: 'functionNode',
          data: { 
            label: 'exampleFunction',
            description: 'Function definition'
          },
          position: { x: 400, y: 250 },
          parentNode: 'global-scope',
          extent: 'parent',
        },
        {
          id: 'memory-heap',
          type: 'heapObjectNode',
          data: { label: 'Memory Heap' },
          position: { x: 500, y: 150 },
        },
        {
          id: 'string-global',
          type: 'heapObjectNode',
          data: { 
            label: 'String', 
            value: '"I\'m global"'
          },
          position: { x: 450, y: 220 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'function-def',
          type: 'heapObjectNode',
          data: { 
            label: 'Function Object', 
            value: 'exampleFunction'
          },
          position: { x: 450, y: 300 },
          parentNode: 'memory-heap',
          extent: 'parent',
        },
        {
          id: 'error-node',
          type: 'executionContextNode',
          data: { 
            label: 'ERROR!',
            description: 'ReferenceError: functionVar is not defined',
            highlighted: true
          },
          position: { x: 300, y: 380 },
        },
      ],
      edges: [
        {
          id: 'globalVar-to-string',
          source: 'globalVar',
          target: 'string-global',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'function-to-def',
          source: 'exampleFunction',
          target: 'function-def',
          markerEnd: { type: MarkerType.Arrow },
        },
        {
          id: 'error-connection',
          source: 'global-ec',
          target: 'error-node',
          animated: true,
          style: { stroke: '#F97316', strokeWidth: 2 },
          markerEnd: { type: MarkerType.Arrow },
        },
      ],
    },
  ],
};

// Add more examples like closures, lexical scope, etc.
const examples: CodeExample[] = [
  closureExample,
  functionScopeExample,
];

export default examples;
