// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// // import { use } from "react";



// export default function SearchBox() {
//     const router = useRouter();
//     const params = useSearchParams();

//     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;

//         const newParams = new URLSearchParams(params.toString());
//         if(value){
//             newParams.set('search',value)
//         }
//         else {
//             newParams.delete('search');
//         }

//         router.push(`/dashboard?${newParams.toString()}`)
//     }



//     return (
//         <input
//             type="text"
//             placeholder="Search…"
//             onChange={handleSearch}
//             className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#f3efe2] border border-gray-700 rounded-xl focus:outline-none text-gray-700 placeholder:text-gray-400"
//         />
//     )
// }