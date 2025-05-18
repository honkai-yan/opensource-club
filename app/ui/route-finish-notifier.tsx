"use client";

import { useEffect } from "react";
import { useRouteFinished } from "../lib/hooks";

export default function RouteFinishNotifier() {
  useEffect(() => {
    useRouteFinished();
  }, []);
  return null;
}
