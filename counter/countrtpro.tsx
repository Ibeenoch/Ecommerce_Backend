// {/* <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-0">
// {/* <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"> */}
// <div className="md:max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
//   <div className="border-b px-4 pb-6">
//     <div className="text-center my-4">
//       <img
//         className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
//         src={user && user && user.image ? user.image.url : pics}
//         alt={`${user && user && user.fullName}'s Profile`}
//       />
//       <div className="">
//         <button className="flex-1 inline-flex rounded-full bg-blue-600 dark:bg-blue-800 text-white w-250 dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
//           <CameraIcon width="16px" height="16px" /> Add Photo
//         </button>
//       </div>
//       <div className="py-2">
//         <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
//           {user && user && user.fullName}
//         </h3>
//         <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
//           <svg
//             className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
//             fill="currentColor"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             width="24"
//             height="24"
//           >
//             <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
//           </svg>
//           {user && user && user.city} , {user && user && user.state}
//         </div>
//       </div>
//     </div>
//     <div className="flex gap-2 px-2">
//       <button onClick={handlebtn1} className={ selected1 ? 'flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2' : "flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2"}>
//         Your Orders
//       </button>
//       <button onClick={handlebtn2} className={ selected2 ? 'flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2' : 'flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2'}>
//         Your Profile
//       </button>
//     </div>
//   </div>
//   <div className="flex column justify-center text-gray-700 items-center">
//     {/* <h2 className="text-lg font-poppins font-bold text-top-color">
//       My Contact
//     </h2> */}

//     { selected1 ? ( aUserTransactions && aUserTransactions.map((el: any) => (
//           <div className="orders">
//             {/* <h3>Shipping Details</h3> */}
//           <div className="flex items-center my-1">
//             <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Full Name:</strong> {el.order.shippingDetails.fullName}</div>
//           </div>

//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Phone:</strong> {el.order.shippingDetails.phone}</div>
//           </div>

//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Address:</strong> {el.order.shippingDetails.address} </div>
//           </div>
          
//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg  font-poppins text-center"> <strong>City:</strong> {el.order.shippingDetails.city}</div>
//           </div>

//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>state:</strong> {el.order.shippingDetails.state}</div>
//           </div>

          
//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Country:</strong> {el.order.shippingDetails.country}</div>
//           </div>

//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg  font-poppins text-center"> <strong>Status:</strong> {el.order.status}</div>
//           </div>

//           <div className="flex items-center my-1">
//           <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Zipcode:</strong> {el.order.shippingDetails.zipcode}</div>
//           </div>
//         </div>
       
//     )) ) : (
//     <div className="profile info">
    
//       <div className="flex items-center my-1">
//         <div className="ml-6 truncate text-lg font-poppins text-center"> <strong> Fullname:</strong> {user.fullName}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Phone:</strong> {user.phone}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Address:</strong> {user.address}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg  font-poppins text-center"> <strong>City:</strong> {user.city}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong> State:</strong> {user.state}</div>
//       </div>

      
//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Email:</strong> {user.email}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg  font-poppins text-center"> <strong>Country:</strong> {user.country}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Zipcode:</strong> {user.zipcode}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Role:</strong> {user.role}</div>
//       </div>

//       <div className="flex items-center my-1">
//       <div className="ml-6 truncate text-lg font-poppins text-center"> <strong>Joined Since:</strong> {user.createdAt.slice(0, 4)}</div>
//       </div>
//     </div>) }
    

    
   

//   </div>
// </div>
// </div> */}