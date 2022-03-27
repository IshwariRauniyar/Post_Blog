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
  dispatch(getPost());
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
