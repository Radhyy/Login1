// Get DOM elements
const signUpButton = document.getElementById('signUpBtn');
const signInButton = document.getElementById('signInBtn');
const container = document.querySelector('.container');

// Add event listeners for smooth animations
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.querySelector('.sign-in-panel form');
    const signUpForm = document.querySelector('.sign-up-panel form');

    // Sign In form submission
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Basic validation
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate login process
        showMessage('Signing in...', 'loading');
        setTimeout(() => {
            showMessage('Login successful!', 'success');
            // Here you would typically redirect or make an API call
        }, 1500);
    });

    // Sign Up form submission
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Basic validation
        if (!name || !email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }
        
        // Simulate registration process
        showMessage('Creating account...', 'loading');
        setTimeout(() => {
            showMessage('Account created successfully!', 'success');
            // Auto switch to sign in panel
            setTimeout(() => {
                container.classList.remove('right-panel-active');
                signUpForm.reset();
            }, 1000);
        }, 1500);
    });

    // Social button interactions
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const socialType = this.classList.contains('facebook') ? 'Facebook' : 
                              this.classList.contains('google') ? 'Google' : 'LinkedIn';
            showMessage(`${socialType} login coming soon!`, 'info');
        });
    });

    // Input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            messageDiv.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            messageDiv.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        case 'loading':
            messageDiv.style.background = 'linear-gradient(135deg, #1e40af, #1e3a8a)';
            break;
        case 'info':
            messageDiv.style.background = 'linear-gradient(135deg, #1e40af, #3b82f6)';
            break;
    }

    document.body.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Switch between panels with Tab + Shift
    if (e.key === 'Tab' && e.shiftKey && e.altKey) {
        e.preventDefault();
        if (container.classList.contains('right-panel-active')) {
            container.classList.remove('right-panel-active');
        } else {
            container.classList.add('right-panel-active');
        }
    }
});

// Smooth page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});