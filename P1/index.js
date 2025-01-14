const buttons = document.querySelectorAll('.Button');
const body = document.querySelector("body");

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.id;
        body.style.backgroundColor = color;
    });
});
