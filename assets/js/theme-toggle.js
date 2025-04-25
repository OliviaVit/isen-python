document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const footer = document.querySelector('footer');
    const copyright = document.querySelector('.copyright');

    function applyBootstrapTheme(theme) {
        const add = (el, ...cls) => el?.classList.add(...cls);
        const remove = (el, ...cls) => el?.classList.remove(...cls);

        if (theme === 'dark') {
            add(body, 'bg-dark', 'text-white');
            remove(body, 'bg-light', 'text-dark');

            add(footer, 'bg-dark', 'text-white');
            remove(footer, 'bg-light', 'text-dark');

            add(copyright, 'bg-dark', 'text-white');
            toggle.innerHTML = '☀️ Light Mode';
        } else {
            add(body, 'bg-light', 'text-dark');
            remove(body, 'bg-dark', 'text-white');

            add(footer, 'bg-light', 'text-dark');
            remove(footer, 'bg-dark', 'text-white');

            remove(copyright, 'bg-dark', 'text-white');
            toggle.innerHTML = '🌙 Dark Mode';
        }
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', current);
            applyBootstrapTheme(current);
        });

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyBootstrapTheme(savedTheme);
    }
});