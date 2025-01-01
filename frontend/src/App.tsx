import React from 'react';
import ExcelUpload from './components/ExcelUpload';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <h1 className="page-title">Add From Excel</h1>
                </div>
            </header>

            <main className="app-main">
                <section className="upload-section">
                    <div className="upload-header">
                        <h3>Add Candidates to Database</h3>
                    </div>
                    <ExcelUpload />
                </section>
            </main>
        </div>
    );
};

export default App;