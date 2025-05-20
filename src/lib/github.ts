export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  homepage: string;
  language: string;
  updated_at: string;
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }
      const repos = await response.json();
    // Filter out the sergeyanton repository
    const filteredRepos = (repos as GitHubRepo[]).filter(repo => repo.name !== "sergeyanton.github.io");
    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}