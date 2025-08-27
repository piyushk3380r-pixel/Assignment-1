'use client';

export default function Footer() {
  return (
    <footer className="border-top mt-auto">
      <div className="container py-3 small d-flex justify-content-between">
        <span>© {new Date().getFullYear()} Piyush (21912969)</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </footer>
  );
}
