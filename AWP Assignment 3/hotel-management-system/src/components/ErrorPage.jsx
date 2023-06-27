import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Oops!</h1>
      <p className="mb-4">Sorry, an unexpected error occurred.</p>
      <p className="mb-4">
        <i className="text-red-500">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
