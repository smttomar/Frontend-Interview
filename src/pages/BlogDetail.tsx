import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogs";
import type { Blog } from "../api/blogs";
import {
    Card,
    CardContent,
    CardTitle,
    CardAction,
    CardHeader,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

function BlogDetail() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery<Blog>({
        queryKey: ["blog", id],
        queryFn: () => getBlogById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <div>Loading blog...</div>;
    }

    if (isError) {
        return <div>Failed to load blog</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardAction>
                        <Link
                            to="/"
                            className="text-sm text-blue-600 hover:underline mb-4 inline-block"
                        >
                            <Button variant="link">← Back to Blogs</Button>
                        </Link>
                    </CardAction>
                    <CardTitle>
                        <h1 className="text-3xl font-bold mb-2">
                            {data?.title}
                        </h1>
                    </CardTitle>
                </CardHeader>
                <p className="text-sm text-gray-600 mb-6">By {data?.author}</p>
                <CardContent>
                    <div className="prose prose-sm max-w-none">
                        <p>{data?.content}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default BlogDetail;
