"use client";
import Editor from "react-simple-wysiwyg";

export default function EditorInput({ field }: { field: any }) {
    const editHandler = (e: any) => {
        field.onChange(e.target.value);
    };

    return (
        <div>
            <Editor
                style={{ height: "200px", overflowY: "scroll" }}
                onChange={editHandler}
                value={field.value}
            />
        </div>
    );
}
