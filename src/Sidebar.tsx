import React from "react";

export interface SidebarItem {
  id: string | number;
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  open?: boolean;
  onClose?: () => void;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}

const modalStyles = (width: number, open: boolean): React.CSSProperties => ({
  position: "fixed",
  top: 0,
  left: open ? 0 : -width,
  width,
  height: "100vh",
  background: "#0f172a",
  color: "#fff",
  boxShadow: open ? "2px 0 16px rgba(0,0,0,0.15)" : undefined,
  transition: "left 0.3s cubic-bezier(.4,0,.2,1)",
  zIndex: 1001,
  display: "flex",
  flexDirection: "column",
});

export default function Sidebar(props: SidebarProps) {
  const { items, open = false, onClose, width = 320, className, style } = props;

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler as any);
    return () => window.removeEventListener("keydown", handler as any);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.35)",
          zIndex: 1000,
        }}
        onClick={onClose}
        aria-label="Đóng sidebar overlay"
      />
      {/* Modal Sidebar */}
      <aside
        className={className}
        style={{ ...modalStyles(width, open), ...style }}
        aria-modal="true"
        role="dialog"
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <strong style={{ fontSize: 18 }}>Ứng dụng SSO</strong>
          <button
            aria-label="Đóng sidebar"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "inherit",
              fontSize: 22,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <nav
          aria-label="Sidebar SSO app list"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((it: SidebarItem) => (
              <li key={it.id} style={{ margin: "12px 0" }}>
                <a
                  href={it.href}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    padding: "12px 18px",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 8,
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: 16,
                    transition: "background 0.2s",
                  }}
                  tabIndex={0}
                >
                  {it.icon && <span style={{ fontSize: 22 }}>{it.icon}</span>}
                  <span>{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <small style={{ opacity: 0.8 }}>© Your Company</small>
        </div>
      </aside>
    </>
  );
}
