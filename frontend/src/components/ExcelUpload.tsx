import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ExcelUpload.css';

const ExcelUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setStatus('idle');
            setMessage(selectedFile.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setStatus('uploading');
        try {
            const response = await axios.post('http://localhost:5000/api/candidates/upload', formData);
            setMessage(response.data.message);
            setStatus('success');
        } catch {
            setMessage("Error uploading file");
            setStatus('error');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="excel-upload-container">
            <div className="upload-card">
                <form onSubmit={handleSubmit} className="upload-form">
                    <input 
                        type="file" 
                        accept=".xlsx" 
                        onChange={handleFileChange} 
                        ref={fileInputRef} 
                        className="file-input" 
                    />
                    <div 
                        onClick={triggerFileInput} 
                        className={`file-drop-zone ${file ? 'file-selected' : ''}`}
                    >
                        <div className="file-drop-content">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="48" 
                                height="48" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="file-icon"
                            >
                                {file ? (
                                    <>
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </>
                                ) : (
                                    <>
                                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                        <path d="M12 12v9" />
                                        <path d="m16 16-4-4-4 4" />
                                    </>
                                )}
                            </svg>
                            <p className="file-drop-text">
                                {file ? `Selected: ${file.name}` : 'Upload a .xlsx or .xls file here'}
                            </p>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={!file || status === 'uploading'} 
                        className={`upload-button ${!file ? 'disabled' : ''} ${status === 'uploading' ? 'uploading' : ''}`}
                    >
                        {status === 'uploading' ? 'Uploading...' : 'Submit'}
                    </button>
                    {message && (
                        <div className={`message-box ${status === 'success' ? 'success' : 'error'}`}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                {status === 'success' ? (
                                    <>
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </>
                                ) : (
                                    <>
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </>
                                )}
                            </svg>
                            <p>{message}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ExcelUpload;