
import React from 'react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("flex items-center justify-between p-4 border-b", className)}>
      <div className="flex items-center gap-2">
        <div className="bg-jsvis-purple text-white p-2 rounded-lg">
          <div className="font-bold text-lg">JS</div>
        </div>
        <div>
          <h1 className="font-bold text-xl">JavaScript Execution Visualizer</h1>
          <p className="text-sm text-muted-foreground">Learn how JavaScript code executes step by step</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
