import React from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";

const CodeEditor = () => {
  const handleChange = (editor, data, value) => {
    // console.log("value: ", value);
    // console.log("data: ", data);
    // console.log("editor: ", editor);
  };

  return (
    <StyledEditorWrapper>
      <CodeMirror
        value="hello"
        options={{
          mode: "jsx",
        }}
        onChange={(editor, data, value) => {
          handleChange(editor, data, value);
        }}
      />
    </StyledEditorWrapper>
  );
};

export default CodeEditor;

const StyledEditorWrapper = styled.div`
  .cm-scroller {
    height: calc(100vh - 68px);
  }

  .cm-editor.cm-focused {
    outline: none !important;
  }
`;
