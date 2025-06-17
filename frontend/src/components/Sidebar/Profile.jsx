import React from "react";

const Profile = () => {
  return (
    <div className="border border-zinc-300 rounded-md flex h-17 px-2 py-1">
      <div className="w-[5vw] flex items-center justify-center border-r-zinc-300 border-r pr-[8px]">
        <div className="bg-zinc-400 w-14.5 h-14.5 rounded-full overflow-hidden">
          <img
          className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1746483966037-c3c9e6374e08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
      <div className="flex pl-4 py-2 items-center gap-2 flex-col">
        <h1 className="leading-none pl-3 font-medium">Name</h1>
        <h2 className="leading-none text-xs text-zinc-500 font-light">Email</h2>
        
      </div>
    </div>
  );
};

export default Profile;
