import type React from 'react'
import { CreateInstanceForm } from './components/create-instance-form'

export default function CreatePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Instance</h1>
        <p className="text-muted-foreground">Create a new virtual machine instance</p>
      </div>
      <CreateInstanceForm></CreateInstanceForm>
    </div>
  )
}
