import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function GET(req, { params }) {
  const url = new URL(req.url);
  const target = `${API_URL}/${params.path.join("/")}${url.search}`;
  const resp = await fetch(target, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await resp.text();
  return new NextResponse(data, { status: resp.status });
}

export async function POST(req, { params }) {
  const body = await req.text();
  const url = new URL(req.url);
  const target = `${API_URL}/${params.path.join("/")}${url.search}`;
  const resp = await fetch(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const data = await resp.text();
  return new NextResponse(data, { status: resp.status });
}

export async function PUT(req, { params }) {
  const body = await req.text();
  const url = new URL(req.url);
  const target = `${API_URL}/${params.path.join("/")}${url.search}`;
  const resp = await fetch(target, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const data = await resp.text();
  return new NextResponse(data, { status: resp.status });
}

export async function DELETE(req, { params }) {
  const url = new URL(req.url);
  const target = `${API_URL}/${params.path.join("/")}${url.search}`;
  const resp = await fetch(target, { method: "DELETE" });
  const data = await resp.text();
  return new NextResponse(data, { status: resp.status });
}
