import { createContext, useState } from "react";
import { Helmet } from "react-helmet";

export const DocumentContext = createContext({ title: "" });

function DocumentProvider(props) {
  const titleRoot = "React Firebase Auth";
  const [docState, setDocState] = useState({ title: titleRoot });

  const setTitle = (pageTitle) => {
    setDocState(`${titleRoot} - ${pageTitle}`);
  };

  return (
    <DocumentContext.Provider value={{ ...docState, setTitle }}>
      <Helmet>
        <title>{docState.title}</title>
      </Helmet>
      {props.children}
    </DocumentContext.Provider>
  );
}

export default DocumentProvider;
