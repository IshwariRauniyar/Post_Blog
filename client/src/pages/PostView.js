import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPost,
  getSinglePost,
  deletePost,
} from "../redux/actions/post.actions";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function Post() {
  const dispatch = useDispatch();
  //   dispatch(getPost());
  const { post: all_data } = useSelector((state) => state.post);
  console.log("pooooost", all_data);
  //   const [post, setPost] = useState([]);
  //   useEffect(() => {
  //     setPost(all_data);
  //   }, [all_data]);

  return (
    <>
      <Layout />
      <div className="container max-w-6xl px-4 mx-auto mt-7">
        <div className="py-3 px-7">
          <h1 className="mt-2 text-3xl font-bold capitalize mb-7 font-poppins">
            Start up your New Career Ventures With Delaware
          </h1>
          <div className="flex-wrap items-center justify-between my-2 md:flex">
            <div className="flex gap-3">
              {/* <div className>
                {" "}
                <img
                  src=" http://placehold.jp/100x80.png"
                  alt=""
                  className="w-20 h-20 rounded-full"
                />
              </div> */}
              {/* <div className="mt-2">
                {" "}
                <a href="#" className="text-sm">
                  December, 2021{" "}
                </a>
                <br />
                <span className>by</span>
                <a href="#" className="text-blue-400">
                  {" "}
                  admin
                </a>
              </div> */}
            </div>
            {/* <div className="flex">
              <ul className="flex flex-wrap py-3">
                <li className="p-1 social-box w-11 h-11">
                  <a
                    href
                    className="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-200 ease-in transform bg-silver-darker rd-br-full rd-tl-full hover:scale-105"
                    style={{ backgroundColor: "rgb(66, 100, 169)" }}
                  >
                    <div className="icon">
                      <svg
                        version="1.1"
                        id="Icons"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        xmlSpace="preserve"
                        className="w-6 h-6 fill-current"
                      >
                        <path
                          id="Facebook"
                          d="M38.078,22.431c0,2.268,0,12.391,0,12.391H29v15.152h9.078V95h18.649V49.975h12.513
c0,0,1.172-7.265,1.74-15.209c-1.629,0-14.183,0-14.183,0s0-8.815,0-10.36c0-1.548,2.033-3.631,4.043-3.631c2.006,0,6.239,0,10.16,0
c0-2.063,0-9.191,0-15.774c-5.235,0-11.189,0-13.814,0C37.617,5,38.078,20.167,38.078,22.431z"
                        />
                      </svg>
                    </div>
                  </a>
                </li>
                <li className="p-1 social-box w-11 h-11">
                  <a
                    href="
                        "
                    className="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-200 ease-in transform bg-silver-darker rd-bl-full rd-tr-full hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)",
                    }}
                  >
                    <div className="icon">
                      <svg
                        height="511pt"
                        viewBox="0 0 511 511.9"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 fill-current"
                      >
                        <path d="M510.95 150.5c-1.2-27.2-5.598-45.898-11.9-62.102-6.5-17.199-16.5-32.597-29.6-45.398-12.802-13-28.302-23.102-45.302-29.5-16.296-6.3-34.898-10.7-62.097-11.898C334.648.3 325.949 0 256.449 0s-78.199.3-105.5 1.5c-27.199 1.2-45.898 5.602-62.097 11.898-17.204 6.5-32.602 16.5-45.403 29.602-13 12.8-23.097 28.3-29.5 45.3-6.3 16.302-10.699 34.9-11.898 62.098C.75 177.801.449 186.5.449 256s.301 78.2 1.5 105.5c1.2 27.2 5.602 45.898 11.903 62.102 6.5 17.199 16.597 32.597 29.597 45.398 12.801 13 28.301 23.102 45.301 29.5 16.3 6.3 34.898 10.7 62.102 11.898 27.296 1.204 36 1.5 105.5 1.5s78.199-.296 105.5-1.5c27.199-1.199 45.898-5.597 62.097-11.898a130.934 130.934 0 0074.903-74.898c6.296-16.301 10.699-34.903 11.898-62.102 1.2-27.3 1.5-36 1.5-105.5s-.102-78.2-1.3-105.5zm-46.098 209c-1.102 25-5.301 38.5-8.801 47.5-8.602 22.3-26.301 40-48.602 48.602-9 3.5-22.597 7.699-47.5 8.796-27 1.204-35.097 1.5-103.398 1.5s-76.5-.296-103.403-1.5c-25-1.097-38.5-5.296-47.5-8.796C94.551 451.5 84.45 445 76.25 436.5c-8.5-8.3-15-18.3-19.102-29.398-3.5-9-7.699-22.602-8.796-47.5-1.204-27-1.5-35.102-1.5-103.403s.296-76.5 1.5-103.398c1.097-25 5.296-38.5 8.796-47.5C61.25 94.199 67.75 84.1 76.352 75.898c8.296-8.5 18.296-15 29.398-19.097 9-3.5 22.602-7.7 47.5-8.801 27-1.2 35.102-1.5 103.398-1.5 68.403 0 76.5.3 103.403 1.5 25 1.102 38.5 5.3 47.5 8.8 11.097 4.098 21.199 10.598 29.398 19.098 8.5 8.301 15 18.301 19.102 29.403 3.5 9 7.699 22.597 8.8 47.5 1.2 27 1.5 35.097 1.5 103.398s-.3 76.301-1.5 103.301zm0 0"></path>
                        <path d="M256.45 124.5c-72.598 0-131.5 58.898-131.5 131.5s58.902 131.5 131.5 131.5c72.6 0 131.5-58.898 131.5-131.5s-58.9-131.5-131.5-131.5zm0 216.8c-47.098 0-85.302-38.198-85.302-85.3s38.204-85.3 85.301-85.3c47.102 0 85.301 38.198 85.301 85.3s-38.2 85.3-85.3 85.3zm0 0M423.852 119.3c0 16.954-13.747 30.7-30.704 30.7-16.953 0-30.699-13.746-30.699-30.7 0-16.956 13.746-30.698 30.7-30.698 16.956 0 30.703 13.742 30.703 30.699zm0 0"></path>
                      </svg>
                    </div>
                  </a>
                </li>
                <li className="p-1 social-box w-11 h-11">
                  <a
                    href="
                        "
                    className="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-200 ease-in transform bg-silver-darker rd-tl-full rd-br-full hover:scale-105"
                    style={{ background: "rgb(0, 114, 177)" }}
                  >
                    <div className="icon">
                      <svg
                        version="1.1"
                        id="Icons"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        xmlSpace="preserve"
                        className="h-6 fill-current w-86"
                      >
                        <path
                          id="LinkedIn"
                          d="M95,59.727V93H75.71V61.955c0-7.799-2.79-13.121-9.773-13.121c-5.33,0-8.502,3.587-9.897,7.056
    c-0.509,1.241-0.64,2.967-0.64,4.704V93H36.104c0,0,0.26-52.58,0-58.028h19.295v8.225c-0.039,0.062-0.09,0.128-0.127,0.188h0.127
    v-0.188c2.563-3.948,7.141-9.588,17.388-9.588C85.483,33.609,95,41.903,95,59.727z M15.919,7C9.318,7,5,11.33,5,17.024
    c0,5.57,4.193,10.031,10.663,10.031h0.129c6.729,0,10.914-4.46,10.914-10.031C26.579,11.33,22.521,7,15.919,7z M6.146,93h19.289
    V34.972H6.146V93z"
                        />
                      </svg>
                    </div>
                  </a>
                </li>
                <li className="p-1 social-box w-11 h-11">
                  <a
                    href="
                        "
                    className="flex flex-col items-center justify-center w-full h-full text-white transition-transform duration-200 ease-in transform bg-silver-darker rd-tl-full rd-br-full hover:scale-105"
                    style={{ background: "rgb(247, 0, 27)" }}
                  >
                    <div className="icon">
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x={0}
                        y={0}
                        viewBox="0 0 511.977 511.977"
                        xmlSpace="preserve"
                        className="w-6 h-6 fill-current"
                      >
                        <path d="M262.948 0C122.628 0 48.004 89.92 48.004 187.968c0 45.472 25.408 102.176 66.08 120.16 6.176 2.784 9.536 1.6 10.912-4.128 1.216-4.352 6.56-25.312 9.152-35.2.8-3.168.384-5.92-2.176-8.896-13.504-15.616-24.224-44.064-24.224-70.752 0-68.384 54.368-134.784 146.88-134.784 80 0 135.968 51.968 135.968 126.304 0 84-44.448 142.112-102.208 142.112-31.968 0-55.776-25.088-48.224-56.128 9.12-36.96 27.008-76.704 27.008-103.36 0-23.904-13.504-43.68-41.088-43.68-32.544 0-58.944 32.224-58.944 75.488 0 27.488 9.728 46.048 9.728 46.048S144.676 371.2 138.692 395.488c-10.112 41.12 1.376 107.712 2.368 113.44.608 3.168 4.16 4.16 6.144 1.568 3.168-4.16 42.08-59.68 52.992-99.808 3.968-14.624 20.256-73.92 20.256-73.92 10.72 19.36 41.664 35.584 74.624 35.584 98.048 0 168.896-86.176 168.896-193.12C463.62 76.704 375.876 0 262.948 0z"></path>
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          <img
            src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt=""
            className="object-cover w-96 md:w-96 lg:w-full h-42 mt-7"
          />
          <div className="pt-5 pb-5 font-poppins">
            If it is, then it is the lessee who gets capital allowances (CAs).
            However, much anti-avoidance legislation is focused on the concept
            of finance leases and the IFRS change will interfere with that. In
            its consultation, HMRC has floated four options for addressing the
            issue. The first is broadly the status quo, with some tinkering. The
            others contain the more radical suggestion to move towards an
            accounts-based regime for taxing leases, using a system of debits
            and credits somewhat akin to the loan relationship regime and which
            would similarly eliminate the capital/revenue divide
            <blockquote className="pl-8 my-8 italic bg-gray-100 border-l-4 border-red-500 py-7 md:pl-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              at ipsum eu nunc commodo posuere et sit amet ligula.
            </blockquote>
            <p>
              If it is, then it is the lessee who gets capital allowances (CAs).
              However, much anti-avoidance legislation is focused on the concept
              of finance leases and the IFRS change will interfere with that. In
              its consultation, HMRC has floated four options for addressing the
              issue. The first is broadly the status quo, with some tinkering.
              The others contain the more radical suggestion to move towards an
              accounts-based regime for taxing leases, using a system of debits
              and credits somewhat akin to the loan relationship regime and
              which would similarly eliminate the capital/revenue divide....
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
