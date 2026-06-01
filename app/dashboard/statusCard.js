export default function StatusCard({title, data, info}){
  return <div className="bg-surface rounded-lg px-4 py-2 flex-1 flex-col gap-2 min-w-60 grow shrink-0 basis-auto whitespace-nowrap">
    <div className="text-md font-bold text-gray-400">{title}</div>
    <div className="text-2xl font-bold text-gray-50">{data}</div>
    <div className="text-[12px] text-success">info</div>
  </div>
}