import Products from "./products";
import Profile from "./profile";
import Statics from "./statics";


export default function Home() {
  return (
    <div className="grid grid-cols-[2fr_8fr] grid-rows-[1fr_4fr] mx-32 my-4 gap-4">
        <div className="[grid-area:1/1/2/3]">
          <Profile />
        </div>
        <div className="[grid-area:2/1/3/2]">
          <Statics/>
        </div>
        <div className="[grid-area:2/2/3/3]">
          <Products />
        </div>
    </div>
  );
}



