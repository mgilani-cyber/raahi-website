import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-heading text-foreground">404</h1>
        <p className="mb-4 text-lg text-muted-foreground font-body">Page not found</p>
        <Link to="/" className="text-primary underline hover:text-primary/90 font-body">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
