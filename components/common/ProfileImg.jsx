import Image from "next/image";
import Avvvatars from "avvvatars-react";

const ProfileImg = ({ profileUrl, username, size }) => {
   if (profileUrl) {
      return (
         <Image
            src={profileUrl}
            height={size * 4}
            width={size * 4}
            className="rounded-full"
            objectFit="cover"
            priority
         />
      )
   }

   return <Avvvatars size={size * 4} value={username} />
}

export default ProfileImg;