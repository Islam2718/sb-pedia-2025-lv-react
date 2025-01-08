import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('files', file);
    });

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Upload successful', response.data);
    })
    .catch(error => {
      console.error('Error uploading files', error);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #FABB51',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: isDragActive ? '#FABB51' : '#ffffff'
      }}
    >
      <input {...getInputProps()} className='form-control' multiple type='file' accept="image/jpeg, image/png, image/jpg, image/gif"/>
      {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag 'n' drop some files here, or click to select files</p> 
      }
    </div>
  );
};

export default FileUpload;
