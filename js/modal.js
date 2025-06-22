// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Initialize modal after projects are loaded
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        
        // Open modal when project card is clicked
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent opening if clicking on a link within the card
                if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                    return;
                }
                
                const projectId = card.getAttribute('data-project');
                const project = projectsData.find(p => 
                    p.title.toLowerCase().replace(/\s+/g, '-') === projectId);
                
                if (project) {
                    openModal(project);
                }
            });
        });
    }, 100);

    // Close modal when X is clicked
    closeModal.addEventListener('click', closeModalHandler);

    // Close modal when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalHandler();
        }
    });

    /**
     * Opens the modal with project details
     * @param {Object} project - The project data object
     */
    function openModal(project) {
        const modalBody = document.querySelector('.modal-body');
        
        // Create the modal content
        let modalContent = `
            <h2 class="modal-project-title">${project.title}</h2>
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="modal-project-image" loading="lazy">` : ''}
            <p class="modal-project-description">${project.description.replace(/\n/g, '<br>')}</p>
            ${project.technologies.length ? `
            <div class="modal-project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>` : ''}
            <div class="modal-project-links">
        `;
        
        // Only show demo link if it exists and is not empty
        if (project.demoLink && project.demoLink !== '#') {
            const linkText = project.demoLink.includes('coursera') || project.demoLink.includes('credly') 
                ? 'View Certificate' 
                : 'Live Demo';
            
            modalContent += `
                <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="demo-link">
                    <i class="fas ${linkText === 'View Certificate' ? 'fa-certificate' : 'fa-external-link-alt'}"></i> ${linkText}
                </a>
            `;
        }
        
        // Only show code link if it exists and is not empty
        if (project.codeLink && project.codeLink !== '#') {
            modalContent += `
                <a href="${project.codeLink}" target="_blank" rel="noopener noreferrer" class="code-link">
                    <i class="fab fa-github"></i> View Code
                </a>
            `;
        }
        
        modalContent += `</div>`;
        modalBody.innerHTML = modalContent;
        
        // Add event listeners to new links to prevent modal close
        modalBody.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    }

    /**
     * Handles closing the modal
     */
    function closeModalHandler() {
        const modal = document.getElementById('projectModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
    }
});