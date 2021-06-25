// @see https://www.carlrippon.com/react-context-with-typescript-p4/

import React from 'react';

export const createCtx = <ContextType>(): readonly [() => ContextType, React.Provider<ContextType | undefined>] => {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
};
