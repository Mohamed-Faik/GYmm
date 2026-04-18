document.addEventListener('DOMContentLoaded', () => {
    const getInfoBtn = document.getElementById('get-info-btn');
    const modal = document.getElementById('camera-modal');
    const closeBtn = document.querySelector('.close');
    const video = document.getElementById('video-feed');
    const statusText = document.querySelector('.status');
    let stream = null;

    // Open Modal and Start Camera
    getInfoBtn.addEventListener('click', async () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll
        
        try {
            statusText.textContent = 'SYSTEMS ONLINE. ACCESSING FEED...';
            
            // Request camera
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }, 
                audio: false 
            });
            
            video.srcObject = stream;
            statusText.textContent = 'SECURE CONNECTION ESTABLISHED. ANALYZING...';

            // Wait 5 seconds then show message
            setTimeout(() => {
                if (stream) { // Check if stream still active
                    statusText.textContent = 'Hada Zaml';
                    statusText.style.fontSize = '2rem';
                    statusText.style.color = 'var(--accent-color)';
                }
            }, 5000);
            
        } catch (err) {
            console.error('Camera Error:', err);
            statusText.textContent = 'ACCESS DENIED: CAMERA NOT FOUND OR PERMISSION REFUSED';
            statusText.style.color = '#ff4b2b';
        }
    });

    // Close Modal and Stop Camera
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
        // Reset status text
        statusText.style.fontSize = '';
        statusText.style.color = '';
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Scroll opacity for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('glass');
        } else {
            // header.classList.remove('glass'); 
            // Keeping glass for design consistency as per guidelines
        }
    });
});
