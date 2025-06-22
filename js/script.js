// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Skills Data
const skillsData = {
    programming: [
        { name: 'Python', level: 85 },
        { name: 'C Language', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'R Programming', level: 70 }
    ],
    web: [
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'JavaScript', level: 75 }
    ],
    database: [
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 70 },
        { name: 'Pandas & NumPy', level: 80 },
        { name: 'Jupyter Notebook', level: 75 }
    ],
    other: [
        { name: 'Git & GitHub', level: 80 },
        { name: 'VS Code', level: 90 },
        { name: 'Problem Solving', level: 85 },
        { name: 'Communication', level: 80 }
    ]
};

// Projects Data
const projectsData = [
    {
        title: 'Agriculture Information Hub',
        description: 'A responsive web application to help farmers and users search crop-related information efficiently with user authentication and feedback system.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
        image: 'images/project1.jpg',
        demoLink: '#',
        codeLink: 'https://github.com/abhivarma2004/agri_project'
    },
    {
        title: 'Data Analysis with Python',
        description: 'Data manipulation, cleaning, and analysis project using Pandas and NumPy for processing large datasets.',
        technologies: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
        image: 'images/project2.jpeg',
        demoLink: 'https://www.coursera.org/account/accomplishments/certificate/D8KLA163QNP3',
        codeLink: '#'
    },
    {
        title: 'AI Concepts Implementation',
        description: 'Implementation of core AI concepts learned through IBM SkillsBuild workshop with practical applications.',
        technologies: ['Python', 'AI', 'Machine Learning'],
        image: 'images/project3.jpeg',
        demoLink: 'https://www.credly.com/badges/fd5eab77-4ba9-468f-ae18-7e140702244b/linked_in_profile',
        codeLink: '#'
    }
];

// Populate Skills Section
function populateSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    
    for (const category in skillsData) {
        const categoryTitle = category === 'programming' ? 'Programming Languages' : 
                            category === 'web' ? 'Web Technologies' : 
                            category === 'database' ? 'Data Science & Databases' : 'Other Skills';
        
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        
        let skillsHTML = `<h3>${categoryTitle}</h3>`;
        
        skillsData[category].forEach(skill => {
            skillsHTML += `
                <div class="skill-item">
                    <div class="skill-name">
                        <span>${skill.name}</span>
                        <span>${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `;
        });
        
        skillCategory.innerHTML = skillsHTML;
        skillsContainer.appendChild(skillCategory);
    }
}

// Populate Projects Section
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-project', project.title.toLowerCase().replace(/\s+/g, '-'));
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 100)}...</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Modal functionality
const modal = document.getElementById('projectModal');
const projectCards = document.querySelectorAll('.project-card');
const closeModal = document.querySelector('.close-modal');

// Open modal when project card is clicked
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectsData.find(p => 
            p.title.toLowerCase().replace(/\s+/g, '-') === projectId);
        
        if (project) {
            openModal(project);
        }
    });
});

// Close modal when X is clicked
closeModal.addEventListener('click', () => {
    closeModalHandler();
});

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

function openModal(project) {
    const modalBody = document.querySelector('.modal-body');
    
    // Create the modal content
    let modalContent = `
        <h2 class="modal-project-title">${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
        <p class="modal-project-description">${project.description.replace(/\n/g, '<br>')}</p>
        <div class="modal-project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="modal-project-links">
    `;
    
    // Only show demo link if it exists and is not '#'
    if (project.demoLink && project.demoLink !== '#') {
        modalContent += `
            <a href="${project.demoLink}" target="_blank" class="demo-link">
                <i class="fas fa-external-link-alt"></i> View Certificate
            </a>
        `;
    }
    
    // Only show code link if it exists and is not '#'
    if (project.codeLink && project.codeLink !== '#') {
        modalContent += `
            <a href="${project.codeLink}" target="_blank" class="code-link">
                <i class="fab fa-github"></i> View Code
            </a>
        `;
    }
    
    modalContent += `</div>`;
    modalBody.innerHTML = modalContent;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateSkills();
    populateProjects();
});