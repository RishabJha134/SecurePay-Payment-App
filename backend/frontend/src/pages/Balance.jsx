export const Balance = ({ value }) => {
    return (
      <div className="flex flex-col p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
        <div className="font-bold text-lg text-[#1E40AF]">Your balance</div>
        <div className="font-semibold text-xl text-[#3B82F6] mt-2">Rs {value}</div>
      </div>
    );
  };
  