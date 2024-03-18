export const navbar_js = () => {
    document.getElementById('user-menu-button').addEventListener('click', function() {
        const dropdown = document.getElementById('user-dropdown');
        dropdown.classList.toggle('hidden');
    });
}