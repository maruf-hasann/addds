
import JoditEditor from "jodit-react";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";

const JoditReact = ({ content, setContent }) => {
  const editor = useRef(null);

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: "Start typing...",
      required: true,
    };
  }, []);
  return (
    <>
      <JoditEditor
        value={content}
        tabIndex={1}
        ref={editor}
        config={config}
        onChange={(newContent) => setContent(newContent)}
      />
    </>
  );
};

export default JoditReact;
