export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hw-footer">
      <span>Neonetz Portfolio</span>
      <span>© {year} Muhammad Adhyaksa Fadillah</span>
      <span>MIT License</span>
    </footer>
  );
}
