export default function Footer() {
  return (
    <footer className="flex items-center justify-between p-4 bg-[#23002C] w-full h-[100px]">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-2xl font-bold text-white">Logo</h1>
        <span className="text-gray-500 mt-1">© 2025 Brand, Inc.</span>
      </div>
      <div className="flex items-center justify-center gap-4 text-white mr-16">
        Settings Course Page
      </div>
      <div className="flex items-center justify-center gap-4 text-white">
        English
      </div>
    </footer>
  );
}
