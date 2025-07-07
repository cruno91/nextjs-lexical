import EditorClientWrapper from "~/components/EditorClientWrapper";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
      <EditorClientWrapper />
    </div>
  );
}