const icons = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const colors = {
  success: { bg: "var(--color-success-light)",  border: "var(--color-success-border)", icon: "var(--color-success)" },
  error:   { bg: "var(--color-danger-light)",   border: "var(--color-danger-border)",  icon: "var(--color-danger)" },
  warning: { bg: "var(--color-warning-light)",  border: "var(--color-warning-border)", icon: "var(--color-warning)" },
  info:    { bg: "var(--color-brand-light)",    border: "var(--color-brand-border)",   icon: "var(--color-brand)" },
};

function createContainer() {
  if (document.getElementById("snackbar-root")) return;
  const el = document.createElement("div");
  el.id = "snackbar-root";
  Object.assign(el.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "9999",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "320px",
    pointerEvents: "none",
  });
  document.body.appendChild(el);
}

export function showSnackbar({ type = "info", title = "", message = "", duration = 3500 } = {}) {
  createContainer();
  const container = document.getElementById("snackbar-root");
  const c = colors[type] || colors.info;
  const id = "snack-" + Date.now();

  const el = document.createElement("div");
  el.id = id;
  Object.assign(el.style, {
    background: c.bg,
    border: `1px solid ${c.border}`,
    borderRadius: "10px",
    padding: "12px 14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    pointerEvents: "all",
    position: "relative",
    overflow: "hidden",
    opacity: "0",
    transform: "translateX(20px)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  });

  el.innerHTML = `
    <span style="font-size:16px; color:${c.icon}; flex-shrink:0; margin-top:1px;">${icons[type]}</span>
    <div style="flex:1; min-width:0;">
      ${title ? `<p style="margin:0 0 2px; font-size:13px; font-weight:600; color:var(--color-foreground);">${title}</p>` : ""}
      <p style="margin:0; font-size:13px; color:var(--color-muted-foreground);">${message}</p>
    </div>
    <button id="close-${id}" style="background:none; border:none; cursor:pointer; color:var(--color-muted-foreground); font-size:16px; padding:0; line-height:1; flex-shrink:0;">✕</button>
    <div id="bar-${id}" style="position:absolute; bottom:0; left:0; height:2px; background:${c.icon}; width:100%; transition:width ${duration}ms linear;"></div>
  `;

  container.prepend(el);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
      document.getElementById(`bar-${id}`).style.width = "0%";
    });
  });

  // close button
  document.getElementById(`close-${id}`).addEventListener("click", () => dismiss(id));

  // auto dismiss
  const timer = setTimeout(() => dismiss(id), duration);
  el._timer = timer;
}

function dismiss(id) {
  const el = document.getElementById(id);
  if (!el) return;
  clearTimeout(el._timer);
  el.style.opacity = "0";
  el.style.transform = "translateX(20px)";
  setTimeout(() => el.remove(), 200);
}