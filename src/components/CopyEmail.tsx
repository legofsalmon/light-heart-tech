import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailProps {
  email: string;
  isDarkMode: boolean;
}

export default function CopyEmail({ email, isDarkMode }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_err) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const accent = isDarkMode ? '#00F0FF' : '#0066CC';

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 group transition-all duration-200 cursor-pointer"
      style={{ color: accent }}
      title={`Click to copy ${email}`}
    >
      <span className="border-b border-dashed group-hover:border-solid transition-all" style={{ borderColor: `${accent}60` }}>
        {email}
      </span>
      {copied ? (
        <span className="copy-toast inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          <Check size={12} />
          Copied
        </span>
      ) : (
        <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
