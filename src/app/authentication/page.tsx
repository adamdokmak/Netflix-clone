export default function AuthPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#181818]">
      <div
        className=" size-24 animate-spin rounded-full border-8 border-red-600 border-e-transparent align-[-0.125em] "
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
