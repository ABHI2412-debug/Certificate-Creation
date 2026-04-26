import React from 'react'
export default function SettingsForm(){
  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="font-semibold">Settings</h3>
      <div className="mt-3 space-y-3">
        <label className="block text-sm">Organization name</label>
        <input className="px-3 py-2 border rounded w-full bg-white" />
        <button className="btn bg-gray-800 text-white mt-2">Save</button>
      </div>
    </div>
  )
}
