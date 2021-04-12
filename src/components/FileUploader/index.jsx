import React, { useState } from 'react'

const FileUploader = ({ setFile, options }) => {
  const [fileName, setFileName] = useState('')
  const settings = options || {}
  return (
    <div className="input-file-container">
      <label className="custom-file-upload">
        <input
          type="file"
          accept={settings.accept || '*'}
          onChange={evt => {
            setFileName(evt.target.files[0].name)
            setFile(evt.target.files[0])
          }}
        />
        Subir Archivo
      </label>
      <div>
        <span>{fileName}</span>
      </div>
      <div>
        <span
          className="action-delete"
          onClick={() => {
            setFileName('')
            setFile({})
          }}
        >
          {fileName && 'Eliminar'}
        </span>
      </div>
    </div>
  )
}

export default FileUploader
