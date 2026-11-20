import { forwardRef, type AnchorHTMLAttributes } from "react";
import { pathToHash } from "../router";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; scroll?: boolean };

/** Sostituto di next/link: i percorsi interni diventano #nome. */
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, prefetch: _p, scroll: _s, ...rest }, ref) {
  void _p;
  void _s;
  const h = href.startsWith("/") ? `#${pathToHash(href)}` : href;
  return <a ref={ref} href={h} {...rest} />;
});
export default Link;
