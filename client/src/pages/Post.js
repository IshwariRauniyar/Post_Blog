import React from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import PostCreateForm from "../components/Form/PostCreateForm";

export default function Post() {
  return (
    <>
      <Layout />
      <div>
        <div className="mx-auto lg:ml-80">
          <div className="max-w-6xl mx-auto lg:ml-90 lg:mt-9">
            <h1 className="py-3 text-2xl font-bold px-7 lg:px-0">Post</h1>
            <div className="p-10 bg-white">
              <PostCreateForm />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
