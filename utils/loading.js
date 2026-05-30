import { ThreeDot } from "react-loading-indicators";

export default function Loading(){
  return <div className="w-screen h-screen relative flex justify-center items-center">
    <ThreeDot color="#3f3f46" size="small" text="" textColor="" />
  </div>;
}