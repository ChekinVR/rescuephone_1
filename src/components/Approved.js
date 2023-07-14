export function Approved({ message }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-2 text-center">
      <span className="sm:inline block">&#10003;{message}</span>
    </div>
  );
}
