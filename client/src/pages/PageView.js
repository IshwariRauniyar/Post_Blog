import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePage } from "../redux/actions/page.actions";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

export default function PageView() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { pages } = useSelector((state) => state.page);
    const viewPage = pages.find((page) => page._id === id);
    console.log("viewPage", viewPage);
    useEffect(() => {
        dispatch(getSinglePage(id));
    }, [id]);

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
                        {viewPage?.Title}
                    </h1>
                    <div className="flex-wrap items-center justify-between my-2 md:flex">
                        {viewPage.SeoTitle ? (
                            <h2 className="text-2xl font-bold font-poppins">
                                {viewPage?.SeoTitle}
                            </h2>
                        ) : null}
                    </div>
                    {viewPage.Image ? (
                        <img
                            src={`http://localhost:8848/${viewPage.Image}`}
                            alt=""
                            className="object-cover w-96 md:w-96 lg:w-full h-42 mt-7"
                        />
                    ) : null}
                    <div className="pt-5 pb-5 font-poppins">
                        {viewPage.Description ? (
                            <div className="mb-6">
                                <label className="block mb-2 text-2xl font-medium">
                                    Description
                                </label>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: viewPage?.Description,
                                    }}
                                />
                            </div>
                        ) : null}
                        <blockquote className="pl-8 my-8 italic bg-gray-100 border-l-4 border-red-500 py-7 md:pl-7">
                            {viewPage?.Slug}
                        </blockquote>
                        {viewPage.SeoDescription ? (
                            <div className="mb-6">
                                <label className="block mb-2 text-2xl font-medium">
                                    Seo Description
                                </label>
                                <p className="text-lg">{viewPage?.SeoDescription}</p>
                            </div>
                        ) : null}



                        {/* {viewPage.Summary ? (
                            <div className="mb-6">
                                <label className="block mb-2 text-2xl font-medium">
                                    Summary
                                </label>
                                <p className="text-lg">{viewPage?.Summary}</p>
                            </div>
                        ) : null} */}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
