export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Settings
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Customize your application preferences.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Theme
          </label>
          <select className="p-2 border rounded-md dark:bg-gray-800 dark:text-white">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
      </div>
    </div>
  );
}
