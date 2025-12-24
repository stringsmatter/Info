document.addEventListener('DOMContentLoaded', () => {
  const tooltipContainer = document.getElementById('tooltip-container');
  let activeButton = null;

  const forceCloseTooltip = () => {
    tooltipContainer.classList.remove('visible');
    tooltipContainer.style.display = 'none';
    activeButton = null;
  };

  const show = (button, text) => {
    forceCloseTooltip();
    activeButton = button;
    tooltipContainer.textContent = text;
    tooltipContainer.style.display = 'block';

    const iconRect = button.getBoundingClientRect();
    const tipRect = tooltipContainer.getBoundingClientRect();
    const top = iconRect.bottom + 6;

    let left = iconRect.left + (iconRect.width / 2) - (tipRect.width / 2);
    if (left < 8) left = 8;
    if (left + tipRect.width > window.innerWidth - 8) {
      left = window.innerWidth - tipRect.width - 8;
    }

    tooltipContainer.style.top = `${top}px`;
    tooltipContainer.style.left = `${left}px`;
    tooltipContainer.classList.add('visible');
  };

  const hide = () => {
    tooltipContainer.classList.remove('visible');
    setTimeout(() => {
      tooltipContainer.style.display = 'none';
    }, 200);
    activeButton = null;
  };

  document.querySelectorAll('.tooltip-icon').forEach(icon => {
    const button = icon.querySelector('button');
    const tooltip = icon.querySelector('.tooltip-text');
    if (!button || !tooltip) return;

    button.addEventListener('focus', () => show(button, tooltip.textContent));
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      show(button, tooltip.textContent);
    });

    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(button, tooltip.textContent);
    }, { passive: false });
  });

  document.addEventListener('click', (e) => {
    if (activeButton && !activeButton.contains(e.target)) hide();
  });
  document.addEventListener('touchstart', (e) => {
    if (activeButton && !activeButton.contains(e.target)) hide();
  }, { passive: true });
});

