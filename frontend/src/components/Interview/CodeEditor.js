import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { SocketContext } from "../../context/socket";
import { langs } from "@uiw/codemirror-extensions-langs";
import { color } from "@uiw/codemirror-extensions-color";
import { Select } from "../Select";

const CodeEditor = () => {
  const basicSetup = { autocompletion: true };
  const [mode, setMode] = useState("javascript");
  const [extensions, setExtensions] = useState([]);
  const [code, setCode] = useState("");

  const socket = useContext(SocketContext);

  useEffect(() => {
    handleLangChange("javascript");
  }, []);

  function handleLangChange(lang) {
    try {
      if (langs[lang]) {
        setExtensions([color, langs[lang]()]);
      } else {
        setExtensions([color]);
      }
      setMode(lang);
      setCode("");
    } catch (error) {
      console.log("error: ", error);
    }
  }

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
      <Select
        label="Language"
        options={Object.keys(langs).sort()}
        value={mode}
        onChange={(evn) => handleLangChange(evn.target.value)}
      ></Select>

      <CodeMirror
        value={code}
        basicSetup={basicSetup}
        extensions={extensions}
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
