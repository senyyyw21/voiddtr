document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000); // Wait 2 seconds

    // Load Scripts
    loadScripts();

    // Modal Events
    setupModalEvents();

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentTheme === 'dark') {
            newTheme = 'light';
            themeIcon.className = 'fas fa-moon';
        } else {
            newTheme = 'dark';
            themeIcon.className = 'fas fa-sun';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Animation effect
        themeToggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 500);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* 
========================================================================
   ADMIN PANEL - SCRIPT EDITING AREA
========================================================================

   You can add new scripts or edit existing ones in the 'scripts' list below.
   
   CHANGING STATUS:
   Update the card label by changing the 'status' field of each script.
   
   Available Status Codes:
   - 'working'      : GREEN color (WORKING) - Use this if the script works perfectly.
   - 'patched'      : RED color (PATCHED) - Use this if the script is patched/blocked by the game.
   - 'maintenance'  : ORANGE color (MAINTENANCE) - Use this if the script is being updated.

========================================================================
*/

const scripts = [
    {
        id: 1,
        title: "Prison Life Script",
        game: "Prison Life",
        description: "Getting A Weapon,ESP",
        image: "noFilt123er.webp",

        // PASTE YOUR CODE HERE
        code: 'loadstring(game:HttpGet("https://trvoidd.netlify.app/scripts/prisonlife.lua"))()',

        // CHANGE STATUS HERE ('working', 'patched', 'maintenance')
        status: 'working'
    },
    {
        id: 3,
        title: "BlackHawk Rescue Misson 5 Script",
        game: "BlackHawk Rescue Misson 5",
        description: "Getting A Weapon,ESP",
        image: "noFw3ilter.jpg",

        // PASTE YOUR CODE HERE
        code: 'loadstring(game:HttpGet("https://trvoidd.netlify.app/scripts/brm5.lua"))()',

        // CHANGE STATUS HERE ('working', 'patched', 'maintenance')
        status: 'working'
    },
    {
        id: 2,
        title: "Criminality Script",
        game: "Criminality",
        description: "ESP,Auto Lockpick,Teleport,FullBright,Noclip,Speed Boost,Crosshair,And Much More",
        image: "noFilter.webp",

        // PASTE YOUR CODE HERE
        code: 'loadstring(game:HttpGet("https://trvoidd.netlify.app/scripts/criminality.lua"))()',

        // CHANGE STATUS HERE ('working', 'patched', 'maintenance')
        status: 'working'
    }
];

/* 
   ========================================================================
   SYSTEM CODES (NO NEED TO CHANGE BELOW)
   ========================================================================
*/

function loadScripts() {
    renderScripts(scripts);
}

function renderScripts(scriptsData) {
    const container = document.getElementById('scripts-container');
    container.innerHTML = '';

    if (scriptsData.length === 0) {
        container.innerHTML = '<p>No scripts added yet.</p>';
        return;
    }

    scriptsData.forEach(script => {
        const card = document.createElement('div');
        card.className = 'script-card';

        // Status Badge Logic
        let statusText = '';
        let statusClass = '';

        switch (script.status) {
            case 'working':
                statusText = 'WORKING';
                statusClass = 'status-working';
                break;
            case 'patched':
                statusText = 'PATCHED';
                statusClass = 'status-patched';
                break;
            case 'maintenance':
                statusText = 'MAINTENANCE';
                statusClass = 'status-maintenance';
                break;
            default:
                statusText = 'UNKNOWN';
                statusClass = 'status-maintenance';
        }

        // Image Area
        const imageHtml = script.image
            ? `<img src="${script.image}" alt="${script.title}" class="script-image" onerror="this.style.display='none'">`
            : `<div style="width:100%;height:100%;background:linear-gradient(135deg, var(--gradient-start), var(--gradient-end))"></div>`;

        card.innerHTML = `
            <div class="script-image-wrapper">
                ${imageHtml}
                <div class="status-badge ${statusClass}">${statusText}</div>
            </div>
            <div class="script-content">
                <h3 class="script-title">${script.title}</h3>
                <span class="script-game">${script.game}</span>
                <p class="script-description">${script.description}</p>
                <div class="script-actions">
                    <button class="script-btn btn-get" data-id="${script.id}">
                        <i class="fas fa-terminal"></i> Get Script
                    </button>
                    <button class="script-btn btn-copy" data-code="${script.code.replace(/"/g, '&quot;')}">
                        <i class="far fa-copy"></i>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Add event listeners
    // 'Get Script' opens modal
    container.querySelectorAll('.btn-get').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const script = scripts.find(s => s.id == id);
            if (script) {
                openModal(script);
            }
        });
    });

    // 'Copy Icon' copies directly
    container.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', function () {
            const code = this.getAttribute('data-code');
            copyLink(code);
        });
    });
}

// Modal Logic
function setupModalEvents() {
    const modal = document.getElementById('script-modal');
    const closeBtn = document.querySelector('.close-modal');
    const copyBtn = document.getElementById('modal-copy-btn');

    closeBtn.onclick = function () {
        closeModal();
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    copyBtn.onclick = function () {
        const code = document.getElementById('modal-code').value;
        copyScript(code);
    }
}

function openModal(script) {
    const modal = document.getElementById('script-modal');
    document.getElementById('modal-title').textContent = script.title;
    document.getElementById('modal-code').value = script.code;

    modal.style.display = 'flex';
    // Trigger reflow
    void modal.offsetWidth;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('script-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function copyScript(code) {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Script copied! You can paste it into your executor.', 'success');
    }).catch(err => {
        console.error('Copy error:', err);
        fallbackCopyTextToClipboard(code, 'Script copied!');
    });
}

function copyLink(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Copy error:', err);
        fallbackCopyTextToClipboard(text, 'Copied!');
    });
}

// Fallback method
function fallbackCopyTextToClipboard(text, successMessage) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        if (successful) {
            showToast(successMessage, 'success');
        } else {
            showToast('Copy failed, please copy manually.', 'error');
        }
    } catch (err) {
        showToast('Copy error.', 'error');
    }

    document.body.removeChild(textArea);
}

// Toast Notification System
function showToast(message, type = 'success') {
    // Check container
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Set Icon
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    // Create Toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        toast.addEventListener('animationend', () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, 3000);
}
