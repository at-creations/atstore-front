import { ClipLoader } from "react-spinners"

export function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader size={50} color={"#123abc"} loading={true} />
    </div>
  )
}