import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogs";
import type { Blog } from "../api/blogs";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function Home() {
    const { data, isLoading, isError } = useQuery<Blog[]>({
        queryKey: ["blogs"],
        queryFn: getBlogs,
    });

    if (isLoading) {
        return <div>Loading blogs...</div>;
    }

    if (isError) {
        return <div>Failed to load blogs</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Blogs</h1>
                    <p className="text-sm text-gray-600">
                        Read the latest articles and insights
                    </p>
                </div>

                <Link to="/create">
                    <Button size="sm">Create Blog</Button>
                </Link>
            </div>

            {data && data.length === 0 ? (
                <div className="text-gray-500 text-sm">
                    No blogs available. Create the first one.
                </div>
            ) : (
                <ul className="space-y-3">
                    {data?.map((blog) => (
                        <li
                            key={blog.id}
                            className="border rounded p-3 hover:bg-gray-50 transition"
                        >
                            <Link
                                to={`/blog/${blog.id}`}
                                className="font-medium text-blue-600 hover:underline"
                            >
                                {blog.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Home;
