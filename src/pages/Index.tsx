
import React from 'react';
import Header from '@/components/Header';
import Visualizer from '@/components/Visualizer';
import codeExamples from '@/data/codeExamples';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow p-4 container mx-auto max-w-7xl">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-center mb-2">JavaScript Execution Visualizer</h1>
          <p className="text-center text-muted-foreground mb-8">
            See how JavaScript code runs step-by-step with visual explanations
          </p>
          
          <div className="h-[calc(100vh-200px)]">
            <Visualizer example={codeExamples[0]} className="h-full" />
          </div>
          
          <div className="mt-8 bg-secondary/30 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Key JavaScript Concepts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-1">Execution Context</h3>
                <p className="text-sm text-muted-foreground">The environment where JavaScript code is executed, containing variables, functions, and the scope chain.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-1">Call Stack</h3>
                <p className="text-sm text-muted-foreground">A data structure that records where in the program we are, pushing and popping execution contexts.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-1">Memory Heap</h3>
                <p className="text-sm text-muted-foreground">Where objects and function closures are stored, with variables holding references to them.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-1">Lexical Scope</h3>
                <p className="text-sm text-muted-foreground">Where variables are accessible is determined by their location in the source code (lexical environment).</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-1">Scope Chain</h3>
                <p className="text-sm text-muted-foreground">How JavaScript looks for variables by searching the current scope, then outer scopes in sequence.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg mb-1">Closures</h3>
                <p className="text-sm text-muted-foreground">Functions that remember their lexical environment, even when executed outside their scope.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>JavaScript Execution Visualizer - Learn JS concepts through visual animations</p>
      </footer>
    </div>
  );
};

export default Index;
