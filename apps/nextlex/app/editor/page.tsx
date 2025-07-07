import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@repo/editor").then((mod) => mod.Editor), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
      <Editor />
    </div>
  );
}
