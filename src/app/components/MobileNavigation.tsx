import FileUploader from "./FileUploader";
import Search from "./Seaech";
import { SyntheticEvent } from "react";
import Image from "next/image";

export default function Header() {


    const Logout = async (e: SyntheticEvent) => {
        e.preventDefault();
    }

    
  return (
    
    <header className="header">
          <Search />
          <div className="header-wrapper">
            <FileUploader />
            <form>
    
                <button onClick={Logout}>
                <Image src="/images/logout.svg"  alt="logout" width={24} height={24} className="w-6"/>
                  
                </button>
            </form>
          </div>
        </header>
    
  );
}
    