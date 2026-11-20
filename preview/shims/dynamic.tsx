import { lazy, Suspense, type ComponentType } from "react";

/** Sostituto di next/dynamic per l'anteprima. */
export default function dynamic<P extends object>(loader: () => Promise<{ default: ComponentType<P> }>) {
  const C = lazy(loader);
  return function Dynamic(props: P) {
    return (
      <Suspense fallback={null}>
        <C {...props} />
      </Suspense>
    );
  };
}
