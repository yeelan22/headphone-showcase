// Components/Footer.jsx
import { Info, Mail, Gavel } from 'lucide-react';// or use <a href> if not using React Router

export function Footer() {
  return (
    <footer className=" text-secondary-text py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-4">
          <a href="/about" className="hover:text-secondary-accent flex items-center gap-1">
            <Info size={16} /> About
          </a>
          <a href="/contact" className="hover:text-secondary-accent flex items-center gap-1">
            <Mail size={16} /> Contact
          </a>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-accent flex items-center gap-1"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub
          </a>
          <a href="/legal" className="hover:text-secondary-accent flex items-center gap-1">
            <Gavel size={16} /> Privacy & Terms
          </a>
        </div>

        <p className="text-xs text-secondary-text">© {new Date().getFullYear()} FutureWear Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
