import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const cls = `hw-btn hw-btn-${variant} ${className}`.trim();
  return <button className={cls} {...props} />;
}

export function LinkButton({ variant = 'primary', className = '', href, ...props }: LinkButtonProps) {
  const cls = `hw-btn hw-btn-${variant} ${className}`.trim();
  return <a className={cls} href={href} {...props} />;
}
