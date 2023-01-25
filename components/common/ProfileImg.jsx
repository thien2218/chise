import Image from "next/image";
import Avvvatars from "avvvatars-react";

const ProfileImg = ({ profileUrl, username, size }) => {
   if (profileUrl) {
      return (
         <div className="relative" style={{ height: `${size * 0.25}rem`, aspectRatio: "1" }}>
            <Image
               src={profileUrl}
               className="rounded-full"
               layout="fill"
               objectFit="cover"
               alt="Profile image"
               priority
            />
         </div>
      )
   }

   return <Avvvatars size={size * 4} value={username} />
}

export default ProfileImg;