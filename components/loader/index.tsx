"use client";
import React from "react";
import { Spinner } from "./spinner";
import useLoadingStore from "@/store/loading";

type Props = {
  children: React.ReactNode;
};

const Loader = ({ children = <></> }: Props) => {
  const { loading } = useLoadingStore();
  return (
    <div className="w-full relative">
      {
        <div className=" absolute z-[99999] left-1/2 top-28">
          <Spinner color={"#3e8505"} />
        </div>
      }
      {loading ? (
        <div className=" absolute z-[99999] left-1/2 top-28">
          <Spinner color={"#3e8505"} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loader;
