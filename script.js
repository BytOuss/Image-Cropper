// script.js
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const image = document.getElementById('image');
    const previewImage = document.getElementById('preview-image');
    const cropButton = document.getElementById('preview');
    const downloadLink = document.getElementById('download');
    const options = document.querySelector('.options');
    let cropper;

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files && files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(image, {
                    aspectRatio: NaN, // Initially free aspect ratio
                    viewMode: 1,
                    preview: '.preview-container',
                });
                options.classList.remove('hide');
                cropButton.classList.remove('hide');
            };
            reader.readAsDataURL(file);
        }
    });

    cropButton.addEventListener('click', () => {
        const croppedCanvas = cropper.getCroppedCanvas();
        previewImage.src = croppedCanvas.toDataURL();
        downloadLink.href = croppedCanvas.toDataURL();
        downloadLink.download = 'cropped-image.png';
        downloadLink.classList.remove('hide');
    });

    document.querySelectorAll('.aspect-ratio-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const ratio = e.target.innerText;
            switch (ratio) {
                case '4.5 x 3.5':
                    cropper.setAspectRatio(4.5 / 3.5); // Aspect Ratio = 0.777
                    break;
                case '6x6 cm':
                    cropper.setAspectRatio(1); // Aspect Ratio = 1
                    break;
                case 'Free':
                    cropper.setAspectRatio(NaN);
                    break;
            }
        });
    });

    document.getElementById('height-input').addEventListener('input', (e) => {
        const height = e.target.value;
        const width = document.getElementById('width-input').value;
        if (height && width) {
            cropper.setAspectRatio(width / height);
        }
    });

    document.getElementById('width-input').addEventListener('input', (e) => {
        const width = e.target.value;
        const height = document.getElementById('height-input').value;
        if (height && width) {
            cropper.setAspectRatio(width / height);
        }
    });
});