import Image from "next/image";
import NetflixLogo from "@/components/NetflixLogo";

export default function AuthPageImages() {
  return (
    <>
      <Image
        src="https://rb.gy/p2hphi"
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="-z-10 hidden object-cover opacity-60 sm:inline"
        objectFit="cover"
        alt="background image"
      />
      <NetflixLogo className="absolute left-4 top-4 h-fit max-h-10 w-32 cursor-pointer object-contain transition-all md:left-10 md:top-6" />
    </>
  );
}
