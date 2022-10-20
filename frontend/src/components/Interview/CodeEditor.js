import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { SocketContext } from "../../context/socket";

const CodeEditor = () => {
  const socket = useContext(SocketContext);
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("code editor", (code) => {
      setCode(code.code);
    });
  }, [socket, code]);

  const handleChange = (editor) => {
    socket.emit("code editor", {
      code: editor,
    });
  };

  return (
    <StyledEditorWrapper>
      <CodeMirror
        value={code}
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
