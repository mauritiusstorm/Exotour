import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles = {
  primary: 'bg-gold text-navy hover:bg-gold-light',
  secondary: 'bg-navy text-cream hover:bg-navy-light',
  outline: 'border border-cream/40 text-cream hover:bg-cream/10'
} as const;

type Variant = keyof typeof variantStyles;

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  variant?: Variant;
  children: ReactNode;
};

type ButtonAsLink = LinkProps & {
  as: 'link';
  variant?: Variant;
  children: ReactNode;
};

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  variant?: Variant;
  children: ReactNode;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '', ...rest } = props;
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (props.as === 'link') {
    const { as: _as, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (props.as === 'a') {
    const { as: _as, ...anchorProps } = rest as ButtonAsAnchor;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
