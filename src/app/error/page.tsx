import Problem from "@/components/Problem";

export default async function ErrorPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const { from } = await searchParams;

  return (
    <div className="flex flex-col font-medium text-gray-500 text-md gap-3 bg-neutral-100 pt-5 px-4 min-h-[80vh] justify-center items-center">
      {from !== "login" && <Problem/>}
      {from === "login" && <>
        <span>Linkul de confirmare este expirat.</span>
      </>}
    </div>
  )
}