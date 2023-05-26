'use client';

import {useSWRText} from "@/app/hooks/useSWRText";
import {SLUGS} from "@/app/constants";
import Link from "next/link";

type EditorPageProps = {
    slug: string;
}

export function Editor({ slug }: EditorPageProps) {

    return (
        <>
            <Nav />
            <Theory slug={slug} />
            <textarea></textarea>
        </>
    )
}

function Nav() {
    return (
        <ul className="flex flex-row space-x-4 m-4">
            { SLUGS.map(slug => (
                <li key={slug}>
                    <Link href={`/editor/${slug}`}>{slug}</Link>
                </li>
            )) }
        </ul>
    );
}

type TheoryProps = {
    slug: string;
}

function Theory({ slug }: TheoryProps) {
    const text = useSWRText(`/${slug}.md`);

    if (text.isLoading) {
        return <p>Loading...</p>;
    }
    if (text.error) {
        return <p>Error: {text.error}</p>;
    }

    return (
        <p>{text.data}</p>
    )
}
