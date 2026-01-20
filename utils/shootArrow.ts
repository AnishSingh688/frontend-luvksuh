export function shootArrow() {
    const template = document.getElementById("arrowTemplate") as HTMLTemplateElement;
    if (!template) return;

    const el = template.content.firstElementChild?.cloneNode(true) as HTMLElement;
    if (!el) return;

    document.body.appendChild(el);
    // Randomize vertical position slightly
    const top = 50 + Math.random() * 30; // 50–80vh
    el.style.top = top + "vh";
    requestAnimationFrame(() => el.classList.add("active"));
    setTimeout(() => el.remove(), 2400);
}
