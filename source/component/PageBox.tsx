import * as React from 'react';

export default function PageBox({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="container d-flex justify-content-center mt-3 mb-3">
      <div>{children}</div>
    </div>
  );
}
