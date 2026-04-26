import React from 'react'
import SettingsForm from '../components/SettingsForm'
export default function Settings(){
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="mt-4 max-w-2xl">
        <SettingsForm />
      </div>
    </div>
  )
}
