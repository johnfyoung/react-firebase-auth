import { Helmet } from "react-helmet";

function withHelmet(WrappedComponent, pageTitle) {
  return (props) => (
    <>
      <Helmet>
        <title>React Firebase Auth - {pageTitle}</title>
      </Helmet>
      <WrappedComponent {...props} />
    </>
  );
}

export default withHelmet;
