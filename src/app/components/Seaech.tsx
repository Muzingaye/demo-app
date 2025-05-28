import { Link } from "lucide-react";
import Image from "next/image";

export default function Search() {
  return (
    <aside className="sidebar">
      <Link href="/" >
        <Image src="/images/market.png" alt="market" width={60} height={50} className="hidden h-auto lg:block"/>

        <Image src="/images/market.png" alt="market" width={50} height={50} className="hidden"/>
      </Link>
    </aside>
  );
}
    