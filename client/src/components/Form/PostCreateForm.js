import React from "react";

export default function PostCreateForm() {
  return (
    <>
      <form action="#" method="post">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            {" "}
            Title
          </label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            type="text"
            name
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            {" "}
            Seo Title
          </label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            type="text"
            name
            placeholder="Enter seo title.."
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            Seo Description
          </label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            name="field-name"
            rows={5}
            placeholder="Write something..."
            defaultValue={""}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            {" "}
            Post Type
          </label>
          <select
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            name
            placeholder="Choose Post Type"
          >
            <option value="actual value 1">Display Text 1</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            Description
          </label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            name="field-name"
            rows={5}
            placeholder="Write something..."
            defaultValue={""}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            {" "}
            Order
          </label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            type="number"
            name
            placeholder="At what order should this post be displayed?"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            Summary
          </label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            name="field-name"
            rows={5}
            placeholder="Write short brief..."
            defaultValue={""}
          />
        </div>
        <div className="mb-6 ">
          <label className="block mb-2 text-sm font-medium" htmlFor>
            Image
          </label>
          <div className="py-2 shrink-0">
            <img
              className="object-cover w-16 h-16 "
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo"
            />
          </div>
          <label className="block pt-2">
            <span className="sr-only">Browse photo </span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
          </label>
        </div>

        <div className="mt-7">
          <div className="flex justify-start space-x-2">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
