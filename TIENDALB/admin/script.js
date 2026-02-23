const modal = document.getElementById('categoryModal');
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtn = document.querySelector('.close-modal');
        const cancelBtn = document.querySelector('.btn-cancel');

        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });