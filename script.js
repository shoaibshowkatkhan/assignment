document.getElementById('upload-input').addEventListener('change', handleImageUpload);
document.getElementById('change-dpi-btn').addEventListener('click', handleChangeDPI);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('change-dpi-btn').disabled = false;
    }
}

function handleChangeDPI() {
    const fileInput = document.getElementById('upload-input');
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select an image.");
        return;
    }

    // Optional: Get custom DPI value from the user
    const customDpiXInput = prompt("Enter custom DPI (X value):");
    const customDpiYInput = prompt("Enter custom DPI (Y value):");

    // Check if custom DPI values were entered and are valid numbers
    const customDpiX = parseFloat(customDpiXInput);
    const customDpiY = parseFloat(customDpiYInput);
    if (isNaN(customDpiX) || isNaN(customDpiY)) {
        alert("Invalid DPI values. Please enter valid numbers.");
        return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('Custom-DPI-X', customDpiX);
    formData.append('Custom-DPI-Y', customDpiY);

    fetch('/update_dpi', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to convert DPI.');
        }
        return response.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        document.getElementById('uploaded-image').src = url;

        // Show the download link with the new DPI image
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = url;
        downloadLink.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error occurred during conversion. Please try again.');
    });
}
