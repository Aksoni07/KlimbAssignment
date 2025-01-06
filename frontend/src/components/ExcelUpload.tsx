import axios from 'axios';
import './ExcelUpload.css';
import React, { useState, useRef } from 'react';
import { IoCloudUploadSharp } from "react-icons/io5";

const ExcelUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setStatus('idle');
            setMessage(selectedFile.name);
        }
    };
    

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
    
        if (!file) return;
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            setStatus('uploading');
            const { data } = await axios.post('http://localhost:5000/api/candidates/upload', formData);
            setMessage(data.message);
            setStatus('success');
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Error uploading file");
            setStatus('error');
        }
    };
    

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    

    return (
        <div className="excelUploadContainer">
            <div className="cardContainer">
                <form onSubmit={handleSubmit} className="upload-form">
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="inputFileContainer"
                    />
                    
                    <div
                        onClick={triggerFileInput}
                        className={`dropYourFile ${file ? 'file-selected' : ''}`}
                    >
                        <IoCloudUploadSharp size={60} />
                        <p className="fileDropInnerText">
                            {file ? `Selected: ${file.name}` : 'Select a .xlsx/.xls file to upload'}
                        </p>
                    </div>
    
                    <button
                        type="submit"
                        disabled={!file || status === 'uploading'}
                        className={`submitButton ${!file ? 'disabled' : ''} ${status === 'uploading' ? 'uploading' : ''}`}
                    >
                        {status === 'uploading' ? 'Uploading...' : 'Submit'}
                    </button>
    
                    {message && (
                        <div className={`messageContainer ${status === 'success' ? 'success' : 'error'}`}>
                            <p>{message}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
    
};

export default ExcelUpload;