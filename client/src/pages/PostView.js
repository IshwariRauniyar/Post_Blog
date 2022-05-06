import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePost } from "../redux/actions/post.actions";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

export default function PostView() {
    const dispatch = useDispatch();
    const { Slug } = useParams();
    const { posts } = useSelector((state) => state.post);
    const viewPost = posts.find((post) => post.Slug === Slug);
    useEffect(() => {
        dispatch(getSinglePost(Slug));
    }, [Slug]);

    return (
        <>
            < button
                className="btn btn-primary"
                onClick={() => {
                    window.history.back();
                }}
            >Go Back</button>

            <div className="container max-w-6xl px-4 mx-auto mt-7">
                <div className="py-3 px-7">
                    <h1 className="mt-2 text-3xl font-bold capitalize mb-7 font-poppins">
                        {viewPost?.Title}
                    </h1>
                    <div className="flex-wrap items-center justify-between my-2 md:flex">
                        {viewPost?.SeoTitle ? (
                            <h2 className="text-2xl font-bold font-poppins">
                                {viewPost?.SeoTitle}
                            </h2>
                        ) : null}
                    </div>
                    {viewPost?.Image ? (
                        <img
                            src={`http://localhost:8848/${viewPost?.Image}`}
                            alt=""
                            className="object-cover w-96 md:w-96 lg:w-full h-42 mt-7"
                        />
                    ) : null}
                    <div className="pt-5 pb-5 font-poppins">
                        {viewPost?.Description ? (
                            <div className="mb-6">
                                <label className="block mb-2 text-2xl font-medium">
                                    Description
                                </label>
                                <div
                                    dangerouslySetInnerHTML={
                                        { __html: viewPost?.Description }
                                    }
                                />
                            </div>
                        ) : null}
                        {viewPost?.SeoDescription ? (
                            <div className="mb-6">
                                <label className="block mb-2 text-2xl font-medium">
                                    Seo Description
                                </label>
                                <p className="text-lg">{viewPost?.SeoDescription}</p>
                            </div>
                        ) : null}

                        <blockquote className="pl-8 my-8 italic bg-gray-100 border-l-4 border-red-500 py-7 md:pl-7">
                            {viewPost?.Slug}
                        </blockquote>

                        {viewPost?.Summary ? (
                            <div className="mb-6">
                                <label className="block mb-2 text-2xl font-medium">
                                    Summary
                                </label>
                                <p className="text-lg">{viewPost?.Summary}</p>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
