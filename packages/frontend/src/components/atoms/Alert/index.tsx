import React from 'react';

interface AlertProps {
    message: string; // Định nghĩa kiểu cho message
    onClose: () => void; // Định nghĩa kiểu cho onClose
    type: 'success' | 'error' | 'warning'; // Định nghĩa kiểu cho type
}

const Alert: React.FC<AlertProps> = ({ message, onClose, type }) => {
    const alertStyle = {
        padding: '20px',
        margin: '10px 0',
        border: '1px solid transparent',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const typeStyles = {
        success: { backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724' },
        error: { backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24' },
        warning: { backgroundColor: '#fff3cd', borderColor: '#ffeeba', color: '#856404' },
    };

    return (
        <div style={{ ...alertStyle, ...typeStyles[type] }}>
            <span>{message}</span>
            <button onClick={onClose} style={{ marginLeft: '10px' }}>Đóng</button>
        </div>
    );
};

export default Alert;
