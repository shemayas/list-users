import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: "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",
});

export const getUsers = async (
  since: number,
  abortController?: AbortController
) => {
  const request = abortController
    ? { signal: abortController.signal }
    : undefined;
  return await octokit.request("GET /users", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    since,
    per_page: 50,
    request,
  });
};
