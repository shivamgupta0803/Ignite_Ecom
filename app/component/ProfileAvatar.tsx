import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const ProfileAvatar = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <Avatar className="relative inline-flex h-12 w-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
        <AvatarImage
          className="w-full h-full object-cover"
          src={''}
          alt="@shadcn"
        />
        <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 text-xl font-medium">
          CN
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
