const UserProfile = ({params} : any) => {
    return (
      <div>
        <h1>Profile Page 
            <span className="bg-teal-100 text-black">
            {params.id}
            </span>
            </h1>
      </div>
    );
  };
  export default UserProfile;
  