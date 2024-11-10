import { loadRemote } from "@module-federation/enhanced/runtime";
import { useEffect, useState } from "react";

export default function useDynamicImport({ module, scope }: {module: string; scope: string}) {
  console.log(module, scope);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (!module && !scope) return;
    const loadComponent = async () => {
      const { default: component } = await loadRemote<any>(`${scope}/${module}`);
      setComponent(() => component);
    };
    loadComponent();
  }, [module, scope]);
  const fallback = () => null;
  return component || fallback;
}
