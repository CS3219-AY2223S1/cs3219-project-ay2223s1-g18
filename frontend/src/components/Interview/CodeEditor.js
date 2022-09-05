import React from "react";
import styled from "styled-components";
import { UnControlled as CodeMirror } from "react-codemirror2";

const CodeEditor = () => {
  return (
    <StyledEditorWrapper>
      <CodeMirror
        value="hello"
        options={{
          mode: "javascript",
          lineNumbers: true,
          textWrapping: true,
        }}
        //   onChange={(editor, data, value) => {}}
      />
    </StyledEditorWrapper>
  );
};

export default CodeEditor;

const StyledEditorWrapper = styled.div`
  .CodeMirror {
    height: calc(100vh - 68px);
  }
`;
