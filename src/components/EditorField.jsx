import { useEffect, useRef } from "react";    
import EditorJS from "@editorjs/editorjs";    
import { tools } from "./Tools";    
    
const EditorField = ({ unique_id, setValue, placeholder, initialValue, type }) => {    
  // Init Instance Editor    
  const editorInstance = useRef();    
    
  // Default initial data    
  const DEFAULT_INITIAL_DATA = {    
    time: new Date().getTime(),    
    blocks: [    
      {    
        type: "header",    
        data: {    
          text: "",    
        },    
      },    
    ],    
  };    
    
  useEffect(() => {    
    // Initialize EditorJS    
    editorInstance.current = new EditorJS({    
      holder: unique_id,    
      tools: tools,    
      data: initialValue || DEFAULT_INITIAL_DATA,    
      onReady: () => {    
        console.log("EditorJS is ready");    
      },    
      onChange: () => {    
        editorInstance.current.save().then((outputData) => {    
          console.log("Data saved: ", outputData);    
          setValue((prev) => ({ ...prev, content: outputData }));    
        }).catch((error) => {    
          console.error("Saving failed: ", error);    
        });    
      },    
    });    
    
    // Cleanup function to destroy the editor instance    
    return () => {    
      if (editorInstance.current) {    
        editorInstance.current.destroy();    
        console.log("EditorJS instance destroyed");    
      }    
    };    
  }, [unique_id, setValue, initialValue]);    
    
  // Log initial value to check if it's being passed correctly    
  useEffect(() => {    
    console.log("Initial value received:", initialValue);    
    if (initialValue && typeof initialValue !== 'object') {  
      console.warn("Initial value should be an object.");  
      initialValue = DEFAULT_INITIAL_DATA; // Atur ke data default jika tidak valid  
    }     
  }, [initialValue]);    
    
  return (    
    <div id={unique_id} className="editor-field" placeholder={placeholder}>    
      {/* Placeholder for EditorJS */}    
      <p>{placeholder}</p>    
    </div>    
  );    
};    
    
export default EditorField;    
