// OLÒGE wordmark for the admin login screen (Logo) and sidebar (Icon).
// Inline styles: the admin doesn't load the site's Tailwind build.
const serif = '"Noto Serif Display Variable", "Times New Roman", Georgia, serif';

export function Logo() {
  return (
    <div style={{ textAlign: "center", lineHeight: 1 }}>
      <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, letterSpacing: "0.04em", color: "#1a1210" }}>OLÒGE</div>
      <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", opacity: 0.6 }}>
        of Africa · House admin
      </div>
    </div>
  );
}

export function Icon() {
  return <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 22, lineHeight: 1 }}>O</div>;
}
