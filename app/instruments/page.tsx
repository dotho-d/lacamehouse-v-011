import { createClient } from '@/lib/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Instruments</h1>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
        {JSON.stringify(instruments, null, 2)}
      </pre>
    </div>
  );
}