import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="p-2">
      <h1>Welcome to Banking App</h1>
      <div className="mt-4">
        <Link to="/create-account">Open a bank account</Link>
      </div>
    </div>
  )
}
