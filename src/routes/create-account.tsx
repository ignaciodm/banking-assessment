import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-account')({
  component: CreateAccountPage,
})

function CreateAccountPage() {
  return (
    <div className="p-2">
      <h1>Open a Bank Account</h1>
      <p>Account creation form will go here</p>
    </div>
  )
}
