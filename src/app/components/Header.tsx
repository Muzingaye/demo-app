import Image from "next/image";
import Search from "./Seaech";
import FileUploader from "./FileUploader";
import { SyntheticEvent } from "react";
// import { Button } from "@/components/ui/button";

export default function Header() {

  const Logout = async (e: SyntheticEvent) => {
      e.preventDefault();
  }
  return (
    <></>
    // <header className="header">
    //   <Search />
    //   <div className="header-wrapper">
    //     <FileUploader />
    //     <form>
    //         <Image src="/images/logo.jpeg"  alt="logo" width={24} height={24} className="w-6"/>

    //         <button onClick={Logout}>Logout</button>
    //         {/* <Button type="submit" className="sign-out-button">Sign Out</Button> */}
    //     </form>
    //   </div>
    // </header>
  );
}
    