import React from 'react';
import ReactModal from 'react-modal';

// Inline Styles
const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
};

const formItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
};

const labelStyle = {
    marginBottom: '5px',
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const buttonStyle = {
    padding: '10px 15px',
    margin: '10px 0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
};

const errorModalContentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '90%',
};

/**
 * Represents the view component for the sign-up page.
 * This component displays a sign-up form with input fields for various user details,
 * including first name, last name, email, person number, username, and password.
 * It also handles the display of a verification code input field in case of verification view,
 * and an error modal to display any form submission errors.
 *
 * @param {string} error - Any error message to be displayed.
 * @param {string} verificationCode - The value of the verification code input field.
 * @param {boolean} showVerificationView - Boolean flag to indicate whether to show the verification view.
 * @param {Object} formData - An object containing form data such as first name, last name, email, etc.
 * @param {Function} handleChange - Callback function to handle changes in the form input fields.
 * @param {Function} handleSubmit - Callback function to handle form submission.
 * @param {Function} handleVerificationSubmit - Callback function to handle verification code submission.
 * @param {Function} redirectToLogIn - Callback function to redirect to the log-in page.
 * @param {Function} setError - Function to set an error message.
 * @param {Function} setVerificationCode - Function to set the verification code.
 * @param {Function} languageData - Function to retrieve language-specific text.
 */

const SignUpView = ({
                        error,
                        verificationCode,
                        showVerificationView,
                        formData,
                        handleChange,
                        handleSubmit,
                        handleVerificationSubmit,
                        redirectToLogIn,
                        setError,
                        setVerificationCode,
                        languageData,
                    }) => {
    ReactModal.setAppElement('body'); // Adjust according to your app's root element

    return (
        <div style={formContainerStyle}>
            <h2>{languageData("application.sign_up_page.sign_up")}</h2>
            {showVerificationView ? (
                <div style={formItemStyle}>
                    <p>{languageData("application.sign_up_page.verification_message")}:</p>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button type="button" onClick={handleVerificationSubmit} style={buttonStyle}>
                        {languageData("application.sign_up_page.verify")}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={formItemStyle}>
                        <label style={labelStyle}>{languageData("application.sign_up_page.first_name")}:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>{languageData("application.sign_up_page.last_name")}:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>{languageData("application.sign_up_page.email")}:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>{languageData("application.sign_up_page.person_number")}:</label>
                        <input type="text" name="personNumber" value={formData.personNumber} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>{languageData("application.sign_up_page.username")}:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>{languageData("application.sign_up_page.password")}:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <button type="submit" style={buttonStyle}>{languageData("application.sign_up_page.sign_up")}</button>
                    <button type="button" onClick={redirectToLogIn} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>{languageData("application.sign_up_page.to_log_in")}</button>
                </form>
            )}
            <ReactModal
                isOpen={!!error}
                onRequestClose={() => setError('')}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    content: errorModalContentStyle,
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => setError('')} style={buttonStyle}>
                        Close
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default SignUpView;
