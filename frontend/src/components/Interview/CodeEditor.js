import React, { useEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";

const CodeEditor = () => {
  return (
    <CodeMirror
      value="hello"
      options={{
        mode: "xml",
        theme: "light",
        height: "100%",
        lineNumbers: true,
        textWrapping: true,
      }}
      //   onChange={(editor, data, value) => {}}
    />
  );
};

export default CodeEditor;
