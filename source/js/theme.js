const currentTheme = localStorage.getItem("setTheme");
const lightTheme = '/css/light.css';
const darkTheme = '/css/dark.css';
var link = document.getElementById('theme');
    if (currentTheme == 'dark') {
        link.href = darkTheme;
    } else {
        link.href = lightTheme;
    }
    document.head.appendChild(link);
var theme = document.getElementById('theme');
    if (currentTheme === null) {
        if (window.matchMedia('prefers-color-scheme: dark').matches) {
            theme.setAttribute('href', darkTheme);
            localStorage.setItem("setTheme", "dark");
        } else {
            theme.setAttribute('href', lightTheme);
            localStorage.setItem("setTheme", "light");
        }
    }
function toggleTheme() {
    if (theme.getAttribute('href') == lightTheme) {
        theme.setAttribute('href', darkTheme);
        localStorage.setItem("setTheme", "dark");
    } else {
        theme.setAttribute('href', lightTheme);
        localStorage.setItem("setTheme", "light");
    }
}