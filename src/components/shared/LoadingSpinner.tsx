function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading clouds...</p>
    </div>
  );
}

export default LoadingSpinner;
