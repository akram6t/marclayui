"use client";

import React, { useEffect, useState } from "react";
import { GitHubMark } from "./github-mark";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/akram6t/marclayui")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <a
      className="docs-github"
      href="https://github.com/akram6t/marclayui"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="MarclayUI on GitHub"
    >
      <GitHubMark />
      <span>{stars !== null ? `${stars.toLocaleString()} Stars` : "Star on GitHub"}</span>
    </a>
  );
}
