import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools";

const EditorField = ({ unique_id, setValue, placeholder, initialValue, type }) => {
  // Init Instance Editor
  const editorInstance = useRef();
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "",
          level: 1,
        },
      },
    ],
  };

  const initEditorInstance = () => {
    const editor = new EditorJS({
      holder: unique_id,
      onReady: () => {
        editorInstance.current = editor;
      },
      autofocus: true,
      data: initialValue ?? DEFAULT_INITIAL_DATA,
      placeholder: placeholder ?? "",
      onChange: async () => {
        await editor.saver.save().then(val => {
          if (type === "blog") {
            setValue(prevState => {
              return { ...prevState, content: val };
            });
          } else {
            setValue(val);
          }
        });
      },
      tools: tools,
    });
  };

  useEffect(() => {
    if (editorInstance.current === null) {
      initEditorInstance();
    }

    return () => {
      editorInstance?.current?.destroy();
      editorInstance.current = null;
    };
  }, []);

  return (
    <div
      id={unique_id}
      className="font-gelasio"
    ></div>
  );
};

export default EditorField;
