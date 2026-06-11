import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-slate-800/60 bg-[#0a0e17]">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Terminal signature */}
          <Link
            href="/"
            className="font-mono text-sm text-slate-600 hover:text-accent-500 transition-colors"
          >
            <span className="text-accent-700">❯</span> j-devlog
          </Link>

          {/* EOF comment */}
          <p className="font-mono text-xs text-slate-700">
            {`// © ${currentYear} Jaejuna · linguistic engineer`}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Jaejuna"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="font-mono text-xs text-slate-700 hover:text-primary-400 transition-colors"
            >
              [github]
            </a>
            <a
              href="mailto:anayana9988@gmail.com"
              aria-label="이메일"
              className="font-mono text-xs text-slate-700 hover:text-primary-400 transition-colors"
            >
              [email]
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
