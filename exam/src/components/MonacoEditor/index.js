import React from "react";
import * as monaco from "monaco-editor";

const MonacoEditor = ({ initialValue, onChange }) => {
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: initialValue,
      language: "html",
      theme: "vs-dark",
    });

    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      onChange(content);
    });

    return () => editor.dispose();
  }, [initialValue, onChange]);

  return <div ref={editorRef} style={{ height: "500px" }} />;
};

export default MonacoEditor;
