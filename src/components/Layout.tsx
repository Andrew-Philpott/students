import React from "react";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div id="app" className="row">
      <div className="column" />
      <div className="column content">{children}</div>
      <div className="column" />
    </div>
  );
};
export default Layout;
