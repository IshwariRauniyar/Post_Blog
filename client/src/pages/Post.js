import React from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function Post() {
  return (
    <>
      <Layout> </Layout>

      <div>
        <div className="mx-auto lg:ml-80">
          <div className="max-w-6xl mx-auto lg:ml-90 lg:mt-9">
            <h1 className="py-3 text-2xl font-bold px-7 lg:px-0">Post</h1>
            <div className="p-10 bg-white">
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
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium" htmlFor>
                    Detail
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
                    Author
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
                    type="user"
                    name
                    placeholder="Enter author name.."
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
                    Publish After
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      datepicker
                      type="text"
                      className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                      placeholder="Select date"
                    />
                  </div>
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
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
