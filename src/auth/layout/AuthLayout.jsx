export const AuthLayout = ({ children, title = '' }) => {
  return (
    <div className="min-h-screen bg-zinc-300 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {children}
      </div>
    </div>
  )
}
