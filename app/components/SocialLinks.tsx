import { FaTwitter, FaGithub } from 'react-icons/fa';

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, children, label }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors duration-300 p-3 rounded-full hover:bg-white/10"
    aria-label={label}
  >
    {children}
  </a>
);

export const SocialLinks = () => (
  <div className="flex justify-center space-x-6">
    <SocialLink href="https://twitter.com/fibnewtonian" label="Follow on Twitter">
      <FaTwitter className="w-8 h-8" />
    </SocialLink>
    <SocialLink href="https://github.com/dakshaymehta" label="View GitHub Profile">
      <FaGithub className="w-8 h-8" />
    </SocialLink>
  </div>
);
