import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const YourComponent: React.FC = () => {
    const [editorData, setEditorData] = useState('');

    return (
        <div>
            <h2>CKEditor Example</h2>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
            />
        </div>
    );
};

export default YourComponent;
