
import React from 'react';
import Editor from '@monaco-editor/react';
import { cn } from '@/lib/utils';

type CodeEditorProps = {
  code: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  activeLine?: number;
  className?: string;
  height?: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  readOnly = false, 
  activeLine, 
  className,
  height = '400px'
}) => {
  const editorRef = React.useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Highlight active line if provided
    if (activeLine !== undefined) {
      highlightLine(activeLine);
    }
  };
  
  const highlightLine = (lineNumber: number) => {
    if (!editorRef.current) return;
    
    // Add decoration for the active line
    const decorations = editorRef.current.deltaDecorations(
      [],
      [
        {
          range: {
            startLineNumber: lineNumber,
            startColumn: 1,
            endLineNumber: lineNumber,
            endColumn: 1000
          },
          options: {
            isWholeLine: true,
            className: 'code-line active',
            glyphMarginClassName: 'active-line-glyph'
          }
        }
      ]
    );
    
    // Scroll to the active line
    editorRef.current.revealLineInCenter(lineNumber);
  };

  React.useEffect(() => {
    if (activeLine !== undefined && editorRef.current) {
      highlightLine(activeLine);
    }
  }, [activeLine]);

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <Editor
        height={height}
        language="javascript"
        value={code}
        theme="vs-light"
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          glyphMargin: true,
        }}
        onChange={onChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
