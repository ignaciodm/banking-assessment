import { createFileRoute, Link } from '@tanstack/react-router';
import { SuccessMessage } from '~/components/common/SuccessMessage';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">Welcome to Banking App</h1>
      
      <SuccessMessage />
      
      <Link
        to="/create-account"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open a bank account
      </Link>
    </div>
  );
}
