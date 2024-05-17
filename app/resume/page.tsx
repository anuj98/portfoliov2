"use client";

export default function Page({
    searchParams
}: {
    searchParams: {
        doc: string;
    }
}) {
  return (
    <embed
      src={searchParams.doc}
      type="application/json"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
