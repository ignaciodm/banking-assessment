import { createFileRoute } from '@tanstack/react-router'
import { CreateAccountForm } from '~/components/account/CreateAccountForm'

export const Route = createFileRoute('/create-account')({
  component: CreateAccountPage,
})

function CreateAccountPage() {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-6">Open a Bank Account</h1>
      <CreateAccountForm />
    </div>
  )
}
