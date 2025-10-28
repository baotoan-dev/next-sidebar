import React, { useState, KeyboardEvent } from "react";

export type SidebarItem = {
  id: string | number;
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

export type SidebarProps = {
  items: SidebarItem[];
  collapsed?: boolean;
  width?: number;
  onToggle?: (collapsed: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
};

const defaultStyles = (
  width: number,
  collapsed: boolean
): React.CSSProperties => ({
  width: collapsed ? 64 : width,
  minWidth: collapsed ? 64 : width,
  height: "100%",
  background: "#0f172a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
});

export default function Sidebar({
  items,
  collapsed: collapsedProp,
  width = 240,
  onToggle,
  className,
  style,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(!!collapsedProp);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    onToggle?.(next);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <aside
      className={className}
      style={{ ...defaultStyles(width, collapsed), ...style }}
      aria-expanded={!collapsed}
      role="complementary"
    >
      <div
        style={{
          padding: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <strong style={{ fontSize: 16 }}>Menu</strong>
        <button
          aria-label={collapsed ? "Mở sidebar" : "Đóng sidebar"}
          onClick={toggle}
          onKeyDown={onKey}
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          {collapsed ? "☰" : "✕"}
        </button>
      </div>

      <nav aria-label="Sidebar navigation" style={{ flex: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((it) => (
            <li key={it.id}>
              {it.href ? (
                <a
                  href={it.href}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    padding: "10px 12px",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {it.icon}
                  <span style={{ display: collapsed ? "none" : "inline" }}>
                    {it.label}
                  </span>
                </a>
              ) : (
                <div
                  tabIndex={0}
                  role="button"
                  style={{ padding: "10px 12px", cursor: "pointer" }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && console.log("activate", it.id)
                  }
                >
                  <span style={{ display: collapsed ? "none" : "inline" }}>
                    {it.label}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <small style={{ opacity: 0.8 }}>
          {collapsed ? "" : "© Your Company"}
        </small>
      </div>
    </aside>
  );
}
