import { Octokit } from '@octokit/rest';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

export type ChangelogDataType = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.listCommits>;

const getChangeLogData = async () => {

  const { data } = await octokit.request(`GET /repos/{owner}/{repo}/commits/{commit_sha}`, {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    sha: process.env.GITHUB_BRANCH_SHA!,    
  });

  return data;
};

export default getChangeLogData;